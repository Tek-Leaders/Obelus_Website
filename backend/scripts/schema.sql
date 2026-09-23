-- ---------------------------------------------------------------------------
-- OBELUS backend: full schema, exported from Django's migrations.
--
-- THIS FILE IS A REFERENCE, NOT THE SOURCE OF TRUTH. The schema is defined by
-- leads/models.py and applied with:
--
--     python manage.py migrate
--
-- Use this export when a DBA needs to review the schema, or to provision a
-- server where running Django is not an option. If you apply it by hand you
-- must also mark the migrations as applied, or Django will try to create the
-- tables again:
--
--     python manage.py migrate --fake
--
-- Regenerate after changing any model:
--
--     python scripts/export_schema.py
-- ---------------------------------------------------------------------------


-- ===== contenttypes.0001 =====
--
-- Create model ContentType
--
CREATE TABLE `django_content_type` (`id` integer AUTO_INCREMENT NOT NULL PRIMARY KEY, `name` varchar(100) NOT NULL, `app_label` varchar(100) NOT NULL, `model` varchar(100) NOT NULL);
--
-- Alter unique_together for contenttype (1 constraint(s))
--
ALTER TABLE `django_content_type` ADD CONSTRAINT `django_content_type_app_label_model_76bd3d3b_uniq` UNIQUE (`app_label`, `model`);

-- ===== contenttypes.0002 =====
--
-- Change Meta options on contenttype
--
-- (no-op)
--
-- Alter field name on contenttype
--
ALTER TABLE `django_content_type` MODIFY `name` varchar(100) NULL;
--
-- Raw Python operation
--
-- THIS OPERATION CANNOT BE WRITTEN AS SQL
--
-- Remove field name from contenttype
--
ALTER TABLE `django_content_type` DROP COLUMN `name`;

-- ===== auth.0001 =====
--
-- Create model Permission
--
CREATE TABLE `auth_permission` (`id` integer AUTO_INCREMENT NOT NULL PRIMARY KEY, `name` varchar(50) NOT NULL, `content_type_id` integer NOT NULL, `codename` varchar(100) NOT NULL);
--
-- Create model Group
--
CREATE TABLE `auth_group` (`id` integer AUTO_INCREMENT NOT NULL PRIMARY KEY, `name` varchar(80) NOT NULL UNIQUE);
CREATE TABLE `auth_group_permissions` (`id` bigint AUTO_INCREMENT NOT NULL PRIMARY KEY, `group_id` integer NOT NULL, `permission_id` integer NOT NULL);
--
-- Create model User
--
CREATE TABLE `auth_user` (`id` integer AUTO_INCREMENT NOT NULL PRIMARY KEY, `password` varchar(128) NOT NULL, `last_login` datetime(6) NOT NULL, `is_superuser` bool NOT NULL, `username` varchar(30) NOT NULL UNIQUE, `first_name` varchar(30) NOT NULL, `last_name` varchar(30) NOT NULL, `email` varchar(75) NOT NULL, `is_staff` bool NOT NULL, `is_active` bool NOT NULL, `date_joined` datetime(6) NOT NULL);
CREATE TABLE `auth_user_groups` (`id` bigint AUTO_INCREMENT NOT NULL PRIMARY KEY, `user_id` integer NOT NULL, `group_id` integer NOT NULL);
CREATE TABLE `auth_user_user_permissions` (`id` bigint AUTO_INCREMENT NOT NULL PRIMARY KEY, `user_id` integer NOT NULL, `permission_id` integer NOT NULL);
ALTER TABLE `auth_permission` ADD CONSTRAINT `auth_permission_content_type_id_codename_01ab375a_uniq` UNIQUE (`content_type_id`, `codename`);
ALTER TABLE `auth_permission` ADD CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);
ALTER TABLE `auth_group_permissions` ADD CONSTRAINT `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` UNIQUE (`group_id`, `permission_id`);
ALTER TABLE `auth_group_permissions` ADD CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);
ALTER TABLE `auth_group_permissions` ADD CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`);
ALTER TABLE `auth_user_groups` ADD CONSTRAINT `auth_user_groups_user_id_group_id_94350c0c_uniq` UNIQUE (`user_id`, `group_id`);
ALTER TABLE `auth_user_groups` ADD CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);
ALTER TABLE `auth_user_groups` ADD CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);
ALTER TABLE `auth_user_user_permissions` ADD CONSTRAINT `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` UNIQUE (`user_id`, `permission_id`);
ALTER TABLE `auth_user_user_permissions` ADD CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);
ALTER TABLE `auth_user_user_permissions` ADD CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`);

-- ===== auth.0002 =====
--
-- Alter field name on permission
--
ALTER TABLE `auth_permission` MODIFY `name` varchar(255) NOT NULL;

-- ===== auth.0003 =====
--
-- Alter field email on user
--
ALTER TABLE `auth_user` MODIFY `email` varchar(254) NOT NULL;

-- ===== auth.0004 =====
--
-- Alter field username on user
--
-- (no-op)

-- ===== auth.0005 =====
--
-- Alter field last_login on user
--
ALTER TABLE `auth_user` MODIFY `last_login` datetime(6) NULL;

-- ===== auth.0007 =====
--
-- Alter field username on user
--
-- (no-op)

-- ===== auth.0008 =====
--
-- Alter field username on user
--
ALTER TABLE `auth_user` MODIFY `username` varchar(150) NOT NULL;

-- ===== auth.0009 =====
--
-- Alter field last_name on user
--
ALTER TABLE `auth_user` MODIFY `last_name` varchar(150) NOT NULL;

-- ===== auth.0010 =====
--
-- Alter field name on group
--
ALTER TABLE `auth_group` MODIFY `name` varchar(150) NOT NULL;

-- ===== auth.0011 =====
--
-- Raw Python operation
--
-- THIS OPERATION CANNOT BE WRITTEN AS SQL

-- ===== auth.0012 =====
--
-- Alter field first_name on user
--
ALTER TABLE `auth_user` MODIFY `first_name` varchar(150) NOT NULL;

-- ===== admin.0001 =====
--
-- Create model LogEntry
--
CREATE TABLE `django_admin_log` (`id` integer AUTO_INCREMENT NOT NULL PRIMARY KEY, `action_time` datetime(6) NOT NULL, `object_id` longtext NULL, `object_repr` varchar(200) NOT NULL, `action_flag` smallint UNSIGNED NOT NULL CHECK (`action_flag` >= 0), `change_message` longtext NOT NULL, `content_type_id` integer NULL, `user_id` integer NOT NULL);
ALTER TABLE `django_admin_log` ADD CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);
ALTER TABLE `django_admin_log` ADD CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

-- ===== admin.0002 =====
--
-- Alter field action_time on logentry
--
-- (no-op)

-- ===== admin.0003 =====
--
-- Alter field action_flag on logentry
--
-- (no-op)

-- ===== sessions.0001 =====
--
-- Create model Session
--
CREATE TABLE `django_session` (`session_key` varchar(40) NOT NULL PRIMARY KEY, `session_data` longtext NOT NULL, `expire_date` datetime(6) NOT NULL);
CREATE INDEX `django_session_expire_date_a5c62663` ON `django_session` (`expire_date`);

-- ===== leads.0001 =====
--
-- Create model Submission
--
CREATE TABLE `leads_submission` (`id` bigint AUTO_INCREMENT NOT NULL PRIMARY KEY, `kind` varchar(20) NOT NULL, `first_name` varchar(100) NOT NULL, `last_name` varchar(100) NOT NULL, `email` varchar(254) NOT NULL, `company` varchar(200) NOT NULL, `phone` varchar(50) NOT NULL, `message` longtext NOT NULL, `extra` json NOT NULL, `marketing_opt_in` bool NOT NULL, `ip_address` char(39) NULL, `user_agent` varchar(300) NOT NULL, `created_at` datetime(6) NOT NULL, `notified_at` datetime(6) NULL);
CREATE INDEX `leads_submission_kind_1f78e846` ON `leads_submission` (`kind`);
CREATE INDEX `leads_submission_email_6f86c35e` ON `leads_submission` (`email`);
CREATE INDEX `leads_submission_created_at_d3f15324` ON `leads_submission` (`created_at`);
CREATE INDEX `leads_submi_kind_9934d5_idx` ON `leads_submission` (`kind`, `created_at` DESC);
