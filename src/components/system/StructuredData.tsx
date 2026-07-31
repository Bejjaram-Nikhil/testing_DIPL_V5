interface StructuredDataProps {
  data: Record<string, unknown> | readonly Record<string, unknown>[];
  id?: string;
}

export function StructuredData({ data, id }: StructuredDataProps) {
  const serializedData = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializedData }}
    />
  );
}
