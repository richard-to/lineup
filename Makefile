test:
	./node_modules/.bin/jasmine-node ./spec/lib/utils.spec.js

clean:
	rm -rf ./tmp/* ./public/uploads/*