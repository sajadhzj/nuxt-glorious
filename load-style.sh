rm -rf src/scss &&
cp -R ../../assets/scss/glorious src/scss &&
rm -rf src/runtime/style &&
mkdir src/runtime/style &&
echo "@use '../../scss/glorious.scss'" >> src/runtime/style/style.scss
