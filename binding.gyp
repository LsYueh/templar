{
    'target_defaults': {
        'dependencies': [
            '<!@(node -p "require(\'node-addon-api\').targets"):node_addon_api_except'
        ]
    },
    'targets': [
        {
            'target_name': 'cobol-pic',
            'sources': [
                'native/cobol/pic.c'
            ],
            'conditions': [
                # macOS / Linux
                [ "OS=='mac' or OS=='linux'", {
                    "cflags": [ "-O2", "-Wall", "-std=c11" ],
                    "cflags_cc": [ "-O2", "-Wall", "-std=c++17" ],

                    # macOS 專用
                    "conditions": [
                        [ "OS=='mac'", {
                            "xcode_settings": {
                                "OTHER_CFLAGS": [ "-O2", "-Wall", "-std=c11" ],
                                "OTHER_CPLUSPLUSFLAGS": [ "-O2", "-Wall", "-std=c++17" ],
                                "GCC_PREPROCESSOR_DEFINITIONS": [ "ENABLE_FEATURE=1", "MACOS=1" ]
                            }
                        }]
                    ]
                }],
                # Windows
                [ "OS=='win'", {
                    "msvs_settings": {
                        "VCCLCompilerTool": {
                        "Optimization": "2",    # /O2
                        "WarningLevel": "3",    # /W3
                        "PreprocessorDefinitions": [ "ENABLE_FEATURE=1" ]
                        }
                    }
                }]
            ]
        },
        {
            'target_name': 'postbuild',
            'type': 'none',
            'dependencies': [ 'cobol-pic' ],
            'copies': [
                {
                    'files': [
                        '<(PRODUCT_DIR)/cobol-pic.node'
                    ],
                    'destination': 'lib/spec/field/cobol'
                }
            ]
        }
    ]
}
