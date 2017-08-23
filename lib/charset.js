let iconvLite = require('iconv-lite')

function decodeBody(response, decoding) {

	let charset = decoding || getResCharset(response);
	if (charset !== 'utf-8' && charset !== 'ascii') {
		response.body = iconvLite.decode(response.body, charset);
	}
	response.body = response.body.toString();
}

function getResCharset(response) {

	let content_type = response.headers['content-type'];
	let default_utf8_body = response.body instanceof Buffer ? response.body.toString() : response.body;
	return parseCharset(content_type || '', default_utf8_body || '', 'utf-8');
}

function parseCharset(header, body, default_charset) {

	let charset = matchCharset(header);
	if (body && charset == null) {
		charset = matchCharset(body);
	}
	if (charset == null) {
		charset = (default_charset) ? default_charset : "utf-8";
	}
	return charset;
}

function matchCharset(str) {

	if (str == null) return null;
	let charset = str.match(/charset=["]*([^>"\s]+)/i);
	if (charset && charset.length >= 2) return charset[1];
	return null;
}

exports.decodeBody = decodeBody;