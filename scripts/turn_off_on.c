#include <stdio.h>
#include <ZWayLib.h>
#include <ZLogging.h>
#include <errno.h>
#include <unistd.h>

int arg = 0;

void reset_zway(ZWay zway) {
    zway_controller_set_default(zway);
}

void print_zway_terminated(ZWay zway, void *arg) {
    zway_log(zway, Information, ZSTR("Z-Way terminated"));
}

ZDataChangeCallback dataChangeCallback(ZWay zway, ZWDataChangeType aType, ZDataHolder aData, void *apArg) {
    //ZWCSTR a = zdata_get_path(aData);
    int str_val;
    zdata_get_integer(aData, &str_val);
    printf("callback %d \n", str_val);
    //printf("callback1 %s \n", a);
}

ZWBOOL get_vendor_string(ZWay zway, int dev) {
    int str_val;
    zdata_acquire_lock(ZDataRoot(zway));
    ZDataHolder cc_data = zway_find_device_instance_cc_data(zway, dev, 0, 61, "61.val");
    zdata_get_integer(cc_data, &str_val);
    printf("farba %d", str_val);
    //zdata_add_callback(cc_data, dataChangeCallback, TRUE, NULL);
    //PrintSubtree(zway, cc_data, 0);
    zdata_release_lock(ZDataRoot(zway));

    return str_val;

}

void PrintSubtree(ZWay zway, ZDataHolder parent, int indent) {
    // print indented name
    int i = 0;
    for (i = 0; i < indent; i++)
        printf("  ");
    printf("%s ", zdata_get_name(parent));
    ZWDataType type;
    zdata_get_type(parent, &type);
    printf("%d \n", type);

    ZDataIterator child = zdata_first_child(parent);
    while (child != NULL) {
        PrintSubtree(zway, child->data, indent + 1);
        child = zdata_next_child(child);
    }
}

int reset_default_coloring(ZWay zway) {
    ZWCSTR vendor = "Fibar Group";
    ZWDevicesList list = zway_devices_list(zway);
    if (list != NULL) {
        int i = 0;
        while (list[i]) {
            i++;
            //zway_log(zway, Debug, "strcmp: %i", strcmp(get_vendor_string(zway, list[i]), vendor));
            //if(strcmp(get_vendor_string(zway, list[i]), vendor) == 0){
//printf("%i",zway_cc_manufacturer_specific_device_id_get(zway, list[i],0,0, NULL, NULL, NULL));

            zway_cc_switch_binary_set(zway, list[i], 0, arg, NULL, NULL, NULL);
            get_vendor_string(zway, list[i]);
//		zway_cc_configuration_set(zway, list[i], 0, 0x34, 6, 0x01, NULL, NULL, NULL); //coloring
            //printf("get %d ", zway_cc_configuration_get(zway, list[i], 0, 0x3D, NULL, NULL, NULL)); //coloring
            //ZWay zway, ZWBYTE node_id, ZWBYTE instance_id, ZWBYTE parameter, int value, ZWBYTE size, ZJobCustomCallback successCallback, ZJobCustomCallback failureCallback, void* callbackArg);
            //}
            i++;
        }
    }
    zway_devices_list_free(list);
    return 0;
}

int do_work(ZWay zway) {

    char cmd, cc_cmd, holder_root;
    ZWBYTE dev, inst, cc, cc_val, nconv;
    char data_path[256];
    char cmd_buffer[256];

    ZWBOOL was_idle = FALSE;

    ZWBOOL basic_level_attached = FALSE;

    int skip = 0;
    int running = TRUE;
    reset_default_coloring(zway);
    while (running) {
        if (!zway_is_running(zway)) {
            running = FALSE;
            break;
        }

        if (!zway_is_idle(zway)) {
            sleep_ms(10);
            continue;
        } else {
            skip++;
            if (skip = 10) {
                running = FALSE;
            }
        }
    }
}

int main(int argc, const char *argv[]) {

    if (argc == 2) {
        arg = atoi(argv[1]);
    }
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

//    zway_device_add_callback(zway, DeviceAdded | DeviceRemoved | InstanceAdded | InstanceRemoved | CommandAdded | CommandRemoved, print_D_I_CC_event, NULL);

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
    do_work(zway);

    r = zway_stop(zway);

    zway_terminate(&zway);

    return 0;
}
