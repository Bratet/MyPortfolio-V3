# Base stage
FROM node:20-alpine AS base
RUN corepack enable

# Install dependencies and build
FROM base AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy all source files
COPY . .

# Install dependencies (HUSKY=0 skips the prepare script in Docker)
ENV HUSKY=0
RUN yarn install

# Set DOCKER env to enable standalone output
ENV DOCKER=1

# Build the application
RUN yarn build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files
COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
