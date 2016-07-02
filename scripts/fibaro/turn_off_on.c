#include <stdio.h>
#include <ZWayLib.h>
#include <ZLogging.h>
#include <errno.h>
#include <unistd.h>

int *devices;
int *commands;
int arraySize;
int deviceIndex;

bool isInArray(int val, int *arr){
    int i;
    for (i = 0; i < arraySize; i++) {
        if (arr[i] == val) {
            deviceIndex = i;
            return true;
        }
    }
    return false;
}

void reset_zway(ZWay zway) {
    zway_controller_set_default(zway);
}

void print_zway_terminated(ZWay zway, void *arg) {
    zway_log(zway, Information, ZSTR("Z-Way terminated"));
}

int reset_default_coloring(ZWay zway) {
    ZWDevicesList list = zway_devices_list(zway);
    if (list != NULL) {
        int i = 0;
        while (list[i]) {
            if(isInArray(i, devices)) {
                zway_cc_configuration_set(zway, list[i], 0, 0x01, 1, 0x01, NULL, NULL, NULL);
                zway_cc_switch_binary_set(zway, list[i], 0, commands[deviceIndex], NULL, NULL, NULL);
                zway_cc_configuration_set(zway, list[i], 0, 0x01, 0, 0x01, NULL, NULL, NULL);
            }
            i++;
        }
    }
    zway_devices_list_free(list);
    return 0;
}

int do_work(ZWay zway) {

    char cmd, cc_cmd, holder_root;
    ZWBYTE dev, inst, cc, cc_val;
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

    ZWLog logger = zlog_create(stdout, Silent);

    devices = new int[argc - 1];
    commands = new int[argc - 1];
    arraySize = (argc - 1) / 2;
    int i = 0;
    int j = 0;
    for(i = 1; i < argc - 1; i += 2){
        devices[j] = atoi(argv[i]);
        commands[j++] = atoi(argv[i + 1]);
    }

    ZWay zway = NULL;
#ifdef _WINDOWS
    ZWError r = zway_init(&zway, ZSTR("COM3"), NULL, NULL, NULL, NULL, logger);
#endif
#ifdef __MACH__
    ZWError r = zway_init(&zway, ZSTR("/dev/cu.SLAB_USBtoUART"), NULL, NULL, NULL, NULL, logger);
#endif
#ifdef __linux__
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
    do_work(zway);

    r = zway_stop(zway);

    zway_terminate(&zway);

    return 0;
}
