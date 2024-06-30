# Self hosted linktr.ee

This project tries to replicate the basic functionality of linktr.ee, which is a
static page for links.

## Customisation

The two files in `src/`: `src/info.ts` and `src/extra.tsx` shouldn't change when
we do updates unless we have new features.

To upload a custom avatar, just drop a `.png` file in the `public/` directory
and rename it to `avatar.png` (while overwriting the default one).

## Testing

We use [bun](https://bun.sh).

1. Install dependencies:

    ```bash
    bun i
    ```

2. Run the server:

    ```bash
    bun dev
    ```

3. Open [http://localhost:3000](http://localhost:3000)
