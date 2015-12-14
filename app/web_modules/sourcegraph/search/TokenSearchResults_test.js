import autotest from "sourcegraph/util/autotest";

import React from "react";

import TokenSearchResults from "sourcegraph/search/TokenSearchResults";

import testdataNoResults from "sourcegraph/search/testdata/TokenSearchResults-noResults.json";
import testdataResults from "sourcegraph/search/testdata/TokenSearchResults-results.json";
import testdataStaleResults from "sourcegraph/search/testdata/TokenSearchResults-staleResults.json";

describe("TokenSearchResults", () => {
	let exampleSrclibDataVersion = {
		CommitsBehind: 0,
	};

	let exampleResult = {
		Def: {
			Kind: "func",
			DocHTML: {__html: "This is a function."},
		},
		URL: "aRepo/.def/aFunction",
		QualifiedName: {__html: "func <span class=\"name\">aFunction</span>"},
	};

	it("should render no results", () => {
		autotest(testdataNoResults, `${__dirname}/testdata/TokenSearchResults-noResults.json`,
			<TokenSearchResults resultData={{Results: [], Total: 0, SrclibDataVersion: exampleSrclibDataVersion}} repo="aRepo" rev="aRev" query="aQuery" page={1} />
		);
	});

	it("should render results", () => {
		autotest(testdataResults, `${__dirname}/testdata/TokenSearchResults-results.json`,
			<TokenSearchResults resultData={{Results: [exampleResult], Total: 1, SrclibDataVersion: exampleSrclibDataVersion}} repo="aRepo" rev="aRev" query="aQuery" page={1} />
		);
	});

	it("should render stale results", () => {
		autotest(testdataStaleResults, `${__dirname}/testdata/TokenSearchResults-staleResults.json`,
			<TokenSearchResults resultData={{Results: [exampleResult], Total: 1, SrclibDataVersion: {CommitsBehind: 1}}} repo="aRepo" rev="aRev" query="aQuery" page={1} />
		);
	});
});
