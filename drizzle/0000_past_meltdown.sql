CREATE TABLE `notes` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text,
	`body` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text
);
