# Changelog

Notable changes are recorded here. Versions follow Semantic Versioning.

## [1.0.0](https://github.com/atmus-tecnologia/nestjs-stripe/releases/tag/v1.0.0) - 2026-11-04

### Breaking changes

- Require Node.js 22.12+ and NestJS 11 or 12; NestJS 10 is no longer supported.
- Updated upstream SDK majors may change types, defaults and resource behavior. See [MIGRATION.md](MIGRATION.md).

### Changes

- Upgrade stripe-node from 12 to 23 and support NestJS 11/12.
- Export the actual register/registerAsync options used by the module.
- Reject missing async factories early.
- Fix the legacy internal provider helper to use its declared config property.
- Document raw-body webhook verification, SDK API-version changes and migration.
- Replace copied documentation with package-specific installation, configuration, API and migration examples.
- Add offline regression tests, clean TypeScript builds, package-consumer validation, CI and an opt-in OIDC npm publishing workflow.
- Remove obsolete lint/release tooling, duplicate runtime peers and the shell-only deploy script.
- Publish only compiled JavaScript, declarations, source maps, documentation and license.

## 0.1.0 (2024-01-15)
