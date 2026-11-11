"""Независимый тестовый oracle: libxml2 XSD + все встроенные Schematron assert.

Требуется Python 3 с lxml. Вход — JSON-массив {schema, xml (base64), filename}.
Расширения usch:iif/getFileName реализованы для проверок в официальных XSD.
"""
import base64
import json
from pathlib import Path
import sys
from lxml import etree

ROOT = Path(__file__).resolve().parents[1] / "schemas/exp"
SCH = {"sch": "http://purl.oclc.org/dsdl/schematron"}
for case in json.load(sys.stdin):
    schema_doc = etree.parse(str(ROOT / case["schema"]))
    document = etree.fromstring(base64.b64decode(case["xml"]), etree.XMLParser(resolve_entities=False, no_network=True))
    etree.XMLSchema(schema_doc).assertValid(document)
    for rule in schema_doc.xpath("//sch:rule", namespaces=SCH):
        for assertion in rule.xpath("sch:assert", namespaces=SCH):
            namespaces = {k: v for k, v in assertion.nsmap.items() if k}
            uri = namespaces["usch"]
            extensions = {
                (uri, "iif"): lambda context, condition, yes, no: yes if condition else no,
                (uri, "getFileName"): lambda context: case["filename"],
            }
            expression = etree.XPath(assertion.get("test"), namespaces=namespaces, extensions=extensions)
            for context in document.xpath("descendant-or-self::" + rule.get("context")):
                if not expression(context):
                    raise AssertionError(f'{case["schema"]}: {rule.get("context")}: {assertion.get("test")}')
print("XSD и Schematron: все документы прошли проверку")
