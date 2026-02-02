
/**
 * Tool: verify_json
 * Validates if the input string is valid JSON and matches the Test Case schema.
 */
function verify(input) {
    try {
        const data = JSON.parse(input);

        // Simple structural check
        if (Array.isArray(data.test_cases)) {
            console.log("VALID_JSON_SCHEMA");
            return true;
        } else if (data.id && data.steps) {
            console.log("VALID_JSON_OBJECT");
            return true;
        }

        console.error("INVALID_SCHEMA");
        process.exit(1);
    } catch (e) {
        console.error("JSON_PARSE_ERROR");
        process.exit(1);
    }
}

const args = process.argv.slice(2);
if (args.length > 0) {
    verify(args[0]);
}
