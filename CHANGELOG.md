# v2.0.0

## Features

1. **<span style="background: #bd011b; color:black; border-radius: 2px; padding: 0 5px">breaking</span>** Added pdf-viewer icons customization.
1. Added pdf viewer color customization via custom css properties. Refer [README.md](./README.md "README.md").
1. Added slots for toolbar and footer.

## Other

1. **<span style="background: #bd011b; color:black; border-radius: 2px; padding: 0 5px">breaking</span>** Changed lib name from _pdf-viewer_ to _vue-pdf-app_. Use `window["vue-pdf-app"]` instead of `window["pdf-viewer"]` for script tag.

# v1.0.2

## Bugs

1. #mainContainer min-width hides secondary toolbar button - [a0b09c4](https://github.com/sandanat/vue-pdf-app/pull/20/commits/a0b09c4b86632f0b816856534f3975a2c0817e62), [PR #20](https://github.com/sandanat/vue-pdf-app/pull/20).

# v1.0.1

## Bugs

1. Pdf styles mutate global styles - [dc3c6ba](https://github.com/sandanat/vue-pdf-app/pull/13/commits/dc3c6ba7d9fde22753a9073c117628179e07e63e), closes [#11](https://github.com/sandanat/vue-pdf-app/issues/11).
