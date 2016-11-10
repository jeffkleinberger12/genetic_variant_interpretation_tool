# genetic_variant_interpretation_tool
html file for variant interpretation

Genetic Variant Interpretation Tool

version 1.0
date 2016-11-09

Synopsis:
This project is an HTML file to incorporate the ACMG Guidelines for Variant Interpretation (Richards et al. 2015) into a site that allows criteria to be selected, interpretation to be returned, and results to be aggregated in a CSV output.

Function:
If the file is opened in most browsers, it should function correctly.
The html file pulls formatting data from the css/style.css and css/style2.css files. As each box is selected, the algorithm from the js/app.js file is executed to tally the levels of evidence and return a variant interpretation. The data from the variant annotation, variant name, patient name, and variant interpretation can be recorded into the table at the bottom of the file by clicking "Add Variant to Table" which executes the function in js/app.js. The table can also be downloaded as a csv or cleared through functions in js/app.js. Finally, the order of the variant evidence categories and checkboxes can be changed through the link to the alternate version of the html file.

Motivation:
This was created to expedite the process for variant interpretation for genetic sequencing data.

References:
This resource was referenced in the publication: 
	Kleinberger J, Maloney KA, Pollin TI, Jeng LJ. An openly available online tool for implementing the ACMG/AMP standards and guidelines for the interpretation of sequence variants. Genet Med. 2016 Nov;18(11):1165. doi: 10.1038/gim.2016.13. PubMed PMID: 26986878; PubMed Central PMCID: PMC5026899.
It references the publication:
	Richards S, Aziz N, Bale S, Bick D, Das S, Gastier-Foster J, Grody WW, Hegde M, Lyon E, Spector E, Voelkerding K, Rehm HL; ACMG Laboratory Quality Assurance Committee.. Standards and guidelines for the interpretation of sequence variants: a joint consensus recommendation of the American College of Medical Genetics and Genomics and the Association for Molecular Pathology. Genet Med. 2015 May;17(5):405-24. doi: 10.1038/gim.2015.30. PubMed PMID: 25741868; PubMed Central PMCID: PMC4544753.
