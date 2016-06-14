#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <ZWayLib.h>
#include <ZLogging.h>
#include <errno.h>
#include <time.h>
#include <stdio.h>

void print_zway_terminated(ZWay zway, void *arg) {
    zway_log(zway, Information, ZSTR("Z-Way terminated"));
}


ZWCSTR get_vendor_string(ZWay zway, int dev) {
    ZWCSTR str_val;
    zdata_acquire_lock(ZDataRoot(zway));
    zdata_get_string(zway_find_device_data(zway, dev, "vendorString"), &str_val);
    zdata_release_lock(ZDataRoot(zway));
    return str_val;
}

int reset_default_coloring(ZWay zway) {
    ZWCSTR vendor = "Fibar Group";
    ZWDevicesList list = zway_devices_list(zway);
    if (list != NULL) {
        printf("remove inactive devices: \n");
        int i = 0;
        while (list[i]) {
            zway_log(zway, Debug, "strcmp: %i", strcmp(get_vendor_string(zway, list[i]), vendor));
            if (strcmp(get_vendor_string(zway, list[i]), vendor) == 0) {
                zway_cc_configuration_set(zway, list[i], 0, 0x3D, 1, 0x01, NULL, NULL, NULL); //coloring
                //ZWay zway, ZWBYTE node_id, ZWBYTE instance_id, ZWBYTE parameter, int value, ZWBYTE size, ZJobCustomCallback successCallback, ZJobCustomCallback failureCallback, void* callbackArg);
            }
            i++;
        }
    }
    zway_devices_list_free(list);
    return 0;
}

void save_watt_value(char *time_point, char *device, float value) {
    /*
    *This Method is currently writting all the values into an csv file.
    *In future it is necessary, to replace this method content by a database call.
    */
    char filename[50];
    char *filenameprefix = "./results/";
    strcat(filename, filenameprefix);
    strcat(filename, device);
    strcat(filename, "_watt.csv");
    FILE *f = fopen(filename, "a+");
    if (f == NULL) {
        printf("Cannot open File");
        exit(123);
    }
    fprintf(f, "%s\t%f\n", time_point, value);
    printf("watt  %s\t%f\t%s\n", time_point, value, device);
    fclose(f);

}

void save_power_value(char *time_point, char *device, float value) {
    /*
    *This Method is currently writting all the values into an csv file.
    *In future it is necessary, to replace this method content by a database call.
    */
    char filename[50];
    char *filenameprefix = "./results/";
    strcat(filename, filenameprefix);
    strcat(filename, device);
    strcat(filename, "_power.csv");
    FILE *f = fopen(filename, "a+");
    if (f == NULL) {
        printf("Cannot open File");
        exit(123);
    }
    fprintf(f, "%s\t%f\n", time_point, value);
    printf("power %s\t%f\n", time_point, value);
    fclose(f);

}

void handle_watt_value(const ZWay zway, ZWDataChangeType type, ZDataHolder data) {
    float current_watt_consumption;
    char *device;
    char nice_time[200];
    time_t rawtime;
    struct tm *timeinfo;
    time(&rawtime);
    timeinfo = localtime(&rawtime);
    strftime(nice_time, sizeof(nice_time), "%F-%T", timeinfo);
    zdata_get_float(data, &current_watt_consumption);
    char *path = zdata_get_path(data);
    strtok(path, ".");
    device = strtok(NULL, ".");
    save_watt_value(nice_time, device, current_watt_consumption);
    free(path);
}

void handle_power_value(const ZWay zway, ZWDataChangeType type, ZDataHolder data) {
    float current_power_consumption;
    char *device;
    char nice_time[200];
    time_t rawtime;
    struct tm *timeinfo;
    time(&rawtime);
    timeinfo = localtime(&rawtime);
    strftime(nice_time, sizeof(nice_time), "%F-%T", timeinfo);
    zdata_get_float(data, &current_power_consumption);
    char *path = zdata_get_path(data);
    strtok(path, ".");
    device = strtok(NULL, ".");
    save_power_value(nice_time, device, current_power_consumption);
    free(path);
}

void dataChangeCallback(const ZWay aZWay, ZWDataChangeType aType, ZDataHolder aData) {
    ZWBOOL value;
    zdata_get_boolean(aData, &value);
    printf("binary switch %d\n", value);
}


/*
int do_work(ZWay zway) {

    char cmd, cc_cmd, holder_root;
    ZWBYTE dev, inst, cc, cc_val, nconv;
    char data_path[256];
    char cmd_buffer[256];

    ZWBOOL was_idle = FALSE;

    ZWBOOL basic_level_attached = FALSE;

    int skip = 0;
    int running = TRUE;
    while (running) {
        if (!zway_is_running(zway)) {
            running = FALSE;
            break;
        }

        if (!zway_is_idle(zway)) {
            sleep_ms(10);
            continue;
        }
        skip = 0;

        if (!basic_level_attached) {
            ZDataHolder basic_level_holder_power, basic_level_holder_meter;
            ZWDevicesList list = zway_devices_list(zway);
            if (list != NULL) {
                int i = 0;
                while (list[i]) {
                    zdata_acquire_lock(ZDataRoot(zway));
                    if (list[i] > 1) {
                        zway_log(zway, Debug, ZSTR("Search data holder for device %i"), list[i]);
                        basic_level_holder_meter = zway_find_device_instance_cc_data(zway, list[i], 0, 0x31, "4.val");
                        if (basic_level_holder_meter) {
                            basic_level_attached = (zdata_add_callback(basic_level_holder_meter,
                                                                       (ZDataChangeCallback) handle_watt_value, FALSE,
                                                                       NULL) == NoError);
                            if (basic_level_attached) {
                                zway_log(zway, Critical,
                                         ZSTR("Basic.data.level holder handler attached to device %i instance 0"),
                                         list[i]);
                            } else {
                                zway_log(zway, Critical, ZSTR("Could not attache handler to device %i"), list[i]);
                            }
                        }
                        basic_level_holder_power = zway_find_device_instance_cc_data(zway, list[i], 0, 0x32, "0.val");
                        if (basic_level_holder_power) {
                            basic_level_attached = (zdata_add_callback(basic_level_holder_power,
                                                                       (ZDataChangeCallback) handle_power_value, FALSE,
                                                                       NULL) == NoError);
                            if (basic_level_attached) {
                                zway_log(zway, Critical,
                                         ZSTR("Basic.data.level holder handler attached to device %i instance 0"),
                                         list[i]);
                            } else {
                                zway_log(zway, Critical, ZSTR("Could not attache handler to device %i"), list[i]);
                            }
                        }
                        ZDataHolder dataHolder = zway_find_device_instance_cc_data(zway, list[i], 0, 0x25, "level");
                        if (dataHolder) {
                            zdata_add_callback(dataHolder, (ZDataChangeCallback) dataChangeCallback, TRUE, NULL);
                        } else {
                            printf("error tu \n");
                        }
                    }
                    zdata_release_lock(ZDataRoot(zway));
                    i++;
                }
                basic_level_attached = TRUE;
            }
            sleep_ms(10);
        }
        sleep_ms(100000);
    }
    return 0;
}

int main(int argc, const char *argv[]) {
    ZWLog logger = zlog_create(stdout, Critical);

    ZWay zway = NULL;
#ifdef _WINDOWS
    ZWError r = zway_init(&zway, ZSTR("COM3"), NULL, NULL, NULL, NULL, logger);
#endif
#ifdef __MACH__
    ZWError r = zway_init(&zway, ZSTR("/dev/cu.SLAB_USBtoUART"), NULL, NULL, NULL, NULL, logger);
#endif
#ifdef __linux__
    //Aus der Doku:
    //ZWEXPORT ZWError zway_init(ZWay *pzway, ZWCSTR port, ZWCSTR config_folder, ZWCSTR translations_folder, ZWCSTR zddx_folder, ZWCSTR name, ZWLog logger);
    ZWError r = zway_init(&zway, ZSTR("/dev/ttyAMA0"), ZSTR("/opt/z-way-server/config/"), ZSTR("/opt/z-way-server/translations/"), ZSTR("/opt/z-way-server/ZDDX/"), NULL, logger);
    zway_log(zway, Debug, ZSTR("ZWAY device successfully created"));
#endif
    if (r != NoError) {
        zway_log_error(zway, Critical, "Failed to init ZWay", r);
        return -1;
    }

    r = zway_start(zway, print_zway_terminated, NULL);
    if (r != NoError) {
        zway_log_error(zway, Critical, "Failed to start ZWay", r);
        return -1;
    }

    r = zway_discover(zway);
    if (r != NoError) {
        zway_log_error(zway, Critical, "Failed to negotiate with Z-Wave stick", r);
        return -1;
    }

    // Application code
    int code = do_work(zway);

    r = zway_stop(zway);

    zway_terminate(&zway);

    return code;
}
*/

class FibaroPlug {
private:
    ZWLog logger;
    ZWay zway;
public:
    FibaroPlug() {
        logger = zlog_create(stdout, Critical);

        zway = NULL;
#ifdef _WINDOWS
        ZWError r = zway_init(&zway, ZSTR("COM3"), NULL, NULL, NULL, NULL, logger);
#endif
#ifdef __MACH__
        ZWError r = zway_init(&zway, ZSTR("/dev/cu.SLAB_USBtoUART"), NULL, NULL, NULL, NULL, logger);
#endif
#ifdef __linux__
        //Aus der Doku:
    //ZWEXPORT ZWError zway_init(ZWay *pzway, ZWCSTR port, ZWCSTR config_folder, ZWCSTR translations_folder, ZWCSTR zddx_folder, ZWCSTR name, ZWLog logger);
    ZWError r = zway_init(&zway, ZSTR("/dev/ttyAMA0"), ZSTR("/opt/z-way-server/config/"), ZSTR("/opt/z-way-server/translations/"), ZSTR("/opt/z-way-server/ZDDX/"), NULL, logger);
    zway_log(zway, Debug, ZSTR("ZWAY device successfully created"));
#endif
        if (r != NoError) {
            std::cout << "Failed to init ZWay\n";
            exit(EXIT_FAILURE);
        }

        r = zway_start(zway, print_zway_terminated, NULL);
        if (r != NoError) {
            std::cout << "Failed to start ZWay\n";
            exit(EXIT_FAILURE);
        }

        r = zway_discover(zway);
        if (r != NoError) {
            std::cout << "Failed to negotiate with Z-Wave stick\n";
            exit(EXIT_FAILURE);
        }
    }

    void appendHandlers() {
        char cmd, cc_cmd, holder_root;
        ZWBYTE dev, inst, cc, cc_val;
        char data_path[256];
        char cmd_buffer[256];

        ZWBOOL was_idle = FALSE;

        ZWBOOL basic_level_attached = FALSE;

        int running = TRUE;
        if (!zway_is_running(zway)) {
            running = FALSE;
            break;
        }

        while (true) {
            if (!zway_is_idle(zway)) {
                sleep_ms(10);
                break;
            }
        }

        ZDataHolder basic_level_holder_power, basic_level_holder_meter;
        ZWDevicesList list = zway_devices_list(zway);
        if (list != NULL) {
            int i = 0;
            while (list[i]) {
                zdata_acquire_lock(ZDataRoot(zway));
                if (list[i] > 1) {
                    zway_log(zway, Debug, ZSTR("Search data holder for device %i"), list[i]);
                    basic_level_holder_meter = zway_find_device_instance_cc_data(zway, list[i], 0, 0x31, "4.val");
                    if (basic_level_holder_meter) {
                        basic_level_attached = (zdata_add_callback(basic_level_holder_meter,
                                                                   (ZDataChangeCallback) handle_watt_value, FALSE,
                                                                   NULL) == NoError);
                        if (basic_level_attached) {
                            zway_log(zway, Critical,
                                     ZSTR("Basic.data.level holder handler attached to device %i instance 0"),
                                     list[i]);
                        } else {
                            zway_log(zway, Critical, ZSTR("Could not attache handler to device %i"), list[i]);
                        }
                    }
                    basic_level_holder_power = zway_find_device_instance_cc_data(zway, list[i], 0, 0x32, "0.val");
                    if (basic_level_holder_power) {
                        basic_level_attached = (zdata_add_callback(basic_level_holder_power,
                                                                   (ZDataChangeCallback) handle_power_value, FALSE,
                                                                   NULL) == NoError);
                        if (basic_level_attached) {
                            zway_log(zway, Critical,
                                     ZSTR("Basic.data.level holder handler attached to device %i instance 0"),
                                     list[i]);
                        } else {
                            zway_log(zway, Critical, ZSTR("Could not attache handler to device %i"), list[i]);
                        }
                    }
                    ZDataHolder dataHolder = zway_find_device_instance_cc_data(zway, list[i], 0, 0x25, "level");
                    if (dataHolder) {
                        zdata_add_callback(dataHolder, (ZDataChangeCallback) dataChangeCallback, TRUE, NULL);
                    }
                }
                zdata_release_lock(ZDataRoot(zway));
                i++;
            }
            basic_level_attached = TRUE;
        }
    }
};
