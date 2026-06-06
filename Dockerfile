# ---- build stage ----
FROM node:22-alpine AS builder
WORKDIR /app

# Copy only what's needed to compile
COPY package.json package-lock.json tsconfig.base.json ./
COPY apps/api/ apps/api/
COPY packages/voxel-core/ packages/voxel-core/

# Install (only needs typescript from devDependencies - API has no runtime npm deps)
RUN npm install

# Compile
RUN npm run build --workspace @microcosm/api

# ---- runtime stage ----
FROM node:22-alpine
WORKDIR /app/apps/api

# Compiled JS (rootDir was repo root so output mirrors repo structure)
COPY --from=builder /app/apps/api/dist ./dist

# Preset assets - seeded into SQLite on startup, must be present at runtime
# REPO_ROOT resolves to /app because CWD (/app/apps/api) ends with "apps/api"
COPY apps/web/public/presets/ /app/apps/web/public/presets/

ENV VOXL_API_PORT=4001
EXPOSE 4001

CMD ["node", "dist/apps/api/src/server.js"]
