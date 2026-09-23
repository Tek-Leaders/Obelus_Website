-- ---------------------------------------------------------------------------
-- OBELUS backend: database and application user.
--
-- Run once per server, as root:
--     mysql -u root -p < scripts/01_create_database.sql
--
-- Replace CHANGE_ME below before running. The application never connects as
-- root: this user has rights on the `obelus` schema only, so a flaw in the
-- web app cannot reach any other database on the server.
-- ---------------------------------------------------------------------------

CREATE DATABASE IF NOT EXISTS obelus
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

-- utf8mb4 is required, not optional: names and messages contain non-Latin
-- characters and emoji, and utf8mb3 silently mangles both.

CREATE USER IF NOT EXISTS 'obelus'@'localhost' IDENTIFIED BY 'CHANGE_ME';

-- ALL PRIVILEGES on this one schema: Django needs DDL rights to apply
-- migrations, not just INSERT/SELECT.
GRANT ALL PRIVILEGES ON obelus.* TO 'obelus'@'localhost';

FLUSH PRIVILEGES;

SELECT schema_name, default_character_set_name, default_collation_name
FROM information_schema.schemata
WHERE schema_name = 'obelus';
