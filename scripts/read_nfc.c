#include <stdlib.h>
#include <nfc/nfc.h>

nfc_device *pnd;
nfc_context *context;

void intHandler(int dummy) {
    nfc_close(pnd);
    nfc_exit(context);
}

static void
print_hex(const uint8_t *pbtData, const size_t szBytes) {
    size_t szPos;


    for (szPos = 0; szPos < szBytes; szPos++) {
        fprintf(stdout, "%02x  ", pbtData[szPos]);
    }
    fprintf(stdout, "\n");
}

int main(int argc, const char *argv[]) {
    signal(SIGINT, intHandler);

    nfc_target nt;
    nfc_init(&context);
    if (context == NULL) {
        fprintf(stdout, "Unable to init libnfc (malloc)\n");
        fflush(stdout);
        exit(EXIT_FAILURE);
    }
    const char *acLibnfcVersion = nfc_version();
    (void) argc;
    fprintf(stdout, "%s uses libnfc %s\n", argv[0], acLibnfcVersion);
    pnd = nfc_open(context, NULL);

    if (pnd == NULL) {
        fprintf(stdout, "ERROR: %s\n", "Unable to open NFC device.");
        exit(EXIT_FAILURE);
    }
    if (nfc_initiator_init(pnd) < 0) {
        nfc_perror(pnd, "nfc_initiator_init");
        exit(EXIT_FAILURE);
    }

    fprintf(stdout, "NFC reader: %s opened\n", nfc_device_get_name(pnd));

    const nfc_modulation nmMifare = {
            .nmt = NMT_ISO14443A,
            .nbr = NBR_106,
    };
    fflush(stdout);
    while (nfc_initiator_select_passive_target(pnd, nmMifare, NULL, 0, &nt) > 0) {
        fprintf(stdout, "The following (NFC) ISO14443A tag was found:\n");
        fprintf(stdout, "    ATQA (SENS_RES): ");
        print_hex(nt.nti.nai.abtAtqa, 2);
        fprintf(stdout, "       UID (NFCID%c): ", (nt.nti.nai.abtUid[0] == 0x08 ? '3' : '1'));
        print_hex(nt.nti.nai.abtUid, nt.nti.nai.szUidLen);
        fprintf(stdout, "      SAK (SEL_RES): ");
        print_hex(&nt.nti.nai.btSak, 1);
        if (nt.nti.nai.szAtsLen) {
            fprintf(stdout, "          ATS (ATR): ");
            print_hex(nt.nti.nai.abtAts, nt.nti.nai.szAtsLen);
        }
        fflush(stdout);
        sleep(3);
    }
    exit(EXIT_SUCCESS);
}
