CREATE TABLE `notes` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text,
	`body` text,
	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	`updated_at` text
);
