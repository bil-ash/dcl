{
  "targets": [
		{
			"target_name":"base",
			"product_prefix": "lib",
      "type": "static_library",
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
      "include_dirs": [
        "<!(node -e \"require('nan')\")",
				"libsrc"
      ]
		}
  ]
}