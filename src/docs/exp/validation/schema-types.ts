/** Ограниченный профиль XSD, используемый тремя схемами поручения 5.01. */
export type Facets = {
    length?: number;
    minLength?: number;
    maxLength?: number;
    totalDigits?: number;
    fractionDigits?: number;
    minInclusive?: number;
    maxInclusive?: number;
    pattern?: string[];
    enumeration?: string[];
};
export type Particle =
    | {
          kind: "element";
          name: string;
          min: number;
          max: number | null;
          type: number;
      }
    | { kind: "sequence" | "choice"; children: Particle[] };
export type SchemaType =
    | { kind: "simple"; base: "string" | "integer" | "decimal"; facets: Facets }
    | {
          kind: "complex";
          attributes: Record<string, { type: number; required: boolean }>;
          model: Particle[];
      };
export type Schema = {
    file: string;
    sha256: string;
    root: number;
    types: SchemaType[];
};
