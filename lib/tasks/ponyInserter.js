const stringReplacer = require("@ui5/builder").processors.stringReplacer;

/**
 * Generates "sap-ui-messagebundle-preload.js" file for all found message bundles
 *
 * @param {Object} parameters Parameters
 * @param {DuplexCollection} parameters.workspace DuplexCollection to read and write files
 * @param {AbstractReader} parameters.dependencies Reader or Collection to read dependency files
 * @param {Object} parameters.options Options
 * @param {string} parameters.options.projectName Project name
 * @param {string} [parameters.options.configuration] Task configuration if given in ui5.yaml
 * @returns {Promise<undefined>} Promise resolving with undefined once data has been written
 */
module.exports = function({workspace, options}) {
	const pattern = options.configuration.pattern || "the";

	return workspace.byGlob("/**/*.{js,json,html}")
		.then((processedResources) => {
			return stringReplacer({
				resources: processedResources,
				options: {
					pattern: new RegExp(pattern),
					replacement: "pony"
				}
			});
		})
		.then((processedResources) => {
			return Promise.all(processedResources.map((resource) => {
				return workspace.write(resource);
			}));
		});
};
