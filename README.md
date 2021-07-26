# cutit
Cut your images to fit a grid in Instagram or to make them slidable (that's all for now).

# Installation
```bash
# Use yarn
yarn global add cutit

# Or npm
npm install --global cutit
```

# Commands
## Homocut
Cut the image in equally sized chunks

### Params
- `-i`: What image do you want to cut?
- `-o`: Where do you want to store the resulting images?
- `-x`: How many vertical cuts do you want?
- `-y`: How many horizontal cuts do you want?

### Example
```bash
cutit homocut -x 2 -y 1 -i example.png

# example.png
AAAAAA
AAAAAA

# Resulting images
AA AA AA

AA AA AA
```

## Coming soon...

