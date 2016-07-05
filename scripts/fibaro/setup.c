#include <stdio.h>
#include <ZWayLib.h>
#include <ZLogging.h>
#include <errno.h>
#include <unistd.h>

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
            zway_cc_switch_binary_set(zway, list[i], 0, 0, NULL, NULL, NULL);
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
