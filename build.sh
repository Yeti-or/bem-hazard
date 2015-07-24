if [[ "$1" == "" ]]; then
    echo "chose what to build! for example: \`./built.sh radio-button\`"
else
#build script for examples
browserify --debug --ignore react --transform reactify js/$@.js > dist/$@.js
fi
