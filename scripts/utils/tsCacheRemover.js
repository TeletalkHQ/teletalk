/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

// Function to delete .tsbuildinfo files recursively
const deleteTsBuildInfoFiles = (dir) => {
	fs.readdir(dir, (err, files) => {
		if (err) {
			console.error(`Error reading directory ${dir}:`, err);
			return;
		}

		files.forEach((file) => {
			const filePath = path.join(dir, file);

			fs.stat(filePath, (err, stats) => {
				if (err) {
					console.error(`Error reading file ${filePath}:`, err);
					return;
				}

				if (stats.isDirectory()) {
					deleteTsBuildInfoFiles(filePath);
				} else if (file === "tsconfig.tsbuildinfo") {
					fs.unlink(filePath, (err) => {
						if (err) {
							console.error(`Error deleting file ${filePath}:`, err);
						} else {
							console.log(`Deleted: ${filePath}`);
						}
					});
				}
			});
		});
	});
};

// Start the deletion process from the current directory
deleteTsBuildInfoFiles(process.cwd());
