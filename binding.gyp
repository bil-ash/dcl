{
  "targets": [
		{
			"target_name":"base",
			"product_prefix": "lib",
      			"type": "static_library",
			'!cflags_cc':[
      			'-std=gnu++14'
    			],
			"include_dirs":[
			'<(node_root_dir)/deps/openssl/openssl/include',
			'libsrc'
			],
			"sources":['<!@(ls -1 libsrc/*.cpp)']
		},
		{
      "target_name": "dcl",
      "sources": ["dcl.cpp"],
      'dependencies': [
        'base'
      ],
	'!cflags_cc':[
      	'-std=gnu++14'
    ],
      "include_dirs": [
        "<!(node -e \"require('nan')\")",
				"libsrc"
      ]
		}
  ]
}
