CREATE TABLE `notes` (
	`id` text PRIMARY KEY,
	`title` text,
	`body` text,
	`created_at` integer DEFAULT (CAST(unixepoch('subsec') * 1000 AS INTEGER)) NOT NULL,
	`updated_at` integer
);
