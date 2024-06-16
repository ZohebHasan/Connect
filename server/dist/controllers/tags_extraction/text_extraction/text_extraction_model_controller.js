"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractTags = void 0;
const child_process_1 = require("child_process");
const extractTags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { text } = req.body;
    console.log("Text: ", text);
    const pathToScript = "/Users/yodahemesay/Connect/client/src/models/tag_extraction/text_extraction/text_extraction_model.py";
    const pathToPython = "/Users/yodahemesay/Connect/venv/bin/python3";
    const python_process = (0, child_process_1.spawn)(pathToPython, [pathToScript, text]);
    python_process.stdin.write(JSON.stringify(text));
    python_process.stdin.end();
    let dataString = '';
    python_process.stdout.on('data', (data) => {
        dataString += data.toString();
        console.log("Data: ", data);
        console.log("DataString: ", dataString);
    });
    python_process.stderr.on('data', (data) => {
        console.error('Error from Python script:', data.toString());
    });
    python_process.on('close', (code) => {
        if (code !== 0) {
            console.log("Code: ", code);
            return res.status(500).json({ message: 'Failed to extract tags' });
        }
        try {
            const tags = dataString;
            console.log("Tags: ", tags);
            res.status(200).json({ message: 'Tags extracted successfully', tags });
        }
        catch (error) {
            res.status(500).json({ message: 'Failed to parse tags' });
        }
    });
});
exports.extractTags = extractTags;
