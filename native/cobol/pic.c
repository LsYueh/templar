#include <node_api.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

typedef struct {
    char symbol; // char
    int count;
} Token;

char* trim(char *str) {
    char *end;
    while (isspace((unsigned char)*str)) str++;
    if (*str == 0) return str;

    end = str + strlen(str) - 1;
    while (end > str && isspace((unsigned char)*end)) end--;
    end[1] = '\0';

    return str;
}

int parseUnit(const char *input, Token *out_token) {
    char *unit = strdup(input);
    if (!unit) return 1;

    unit = trim(unit);
    size_t len = strlen(unit);

    if (len == 0) { free(unit); return 1; }

    const char *valid = "9XAVPZS*.,/+-";
    char c = toupper((unsigned char)unit[0]);
    if (!strchr(valid, c)) { free(unit); return 1; }

    out_token->symbol = c;
    out_token->count = 1;

    if (len > 1) {
        if (unit[1] != '(' || unit[len - 1] != ')') { free(unit); return 1; }
        size_t numlen = len - 3;
        if (numlen == 0 || numlen >= 32) { free(unit); return 2; }

        char numbuf[32];
        strncpy(numbuf, unit + 2, numlen);
        numbuf[numlen] = '\0';

        for (size_t i = 0; i < numlen; i++) {
            if (!isdigit((unsigned char)numbuf[i])) { free(unit); return 3; }
        }

        out_token->count = atoi(numbuf);
    }

    free(unit);
    return 0;
}

// JS 包裝
napi_value JsParseUnit(napi_env env, napi_callback_info info) {
    napi_status status;
    size_t argc = 1;
    napi_value args[1];

    status = napi_get_cb_info(env, info, &argc, args, NULL, NULL);
    if (status != napi_ok || argc < 1) {
        napi_throw_type_error(env, NULL, "Expected one argument");
        return NULL;
    }

    // 取得 JS 字串
    size_t str_len;
    status = napi_get_value_string_utf8(env, args[0], NULL, 0, &str_len);
    if (status != napi_ok) {
        napi_throw_type_error(env, NULL, "Invalid string");
        return NULL;
    }

    char *input = malloc(str_len + 1);
    napi_get_value_string_utf8(env, args[0], input, str_len + 1, &str_len);

    // 呼叫 C API
    Token t;
    int ret = parseUnit(input, &t);
    free(input);

    if (ret != 0) {
        napi_throw_error(env, NULL, "Invalid PIC unit");
        return NULL;
    }

    // 回傳 JS 物件
    napi_value obj, symbol, count;
    napi_create_object(env, &obj);
    char sym_str[2] = {t.symbol, '\0'};
    napi_create_string_utf8(env, sym_str, 1, &symbol);
    napi_create_int32(env, t.count, &count);

    napi_set_named_property(env, obj, "char", symbol);
    napi_set_named_property(env, obj, "count", count);

    return obj;
}

napi_value Init(napi_env env, napi_value exports) {
    napi_value fn;
    napi_create_function(env, NULL, 0, JsParseUnit, NULL, &fn);
    napi_set_named_property(env, exports, "parseUnit", fn);
    return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)
