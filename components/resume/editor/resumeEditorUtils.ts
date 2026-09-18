export type ResumeFieldPath = string;

function deepClone<T>(value: T): T {
  if (typeof structuredClone !== "undefined") {
    return structuredClone(value);
  }

  return JSON.parse(JSON.stringify(value)) as T;
}

function normalizeFieldPath(field: ResumeFieldPath): string[] {
  return field
    .replace(/\[(\d+)\]/g, ".$1")
    .split(".")
    .filter(Boolean);
}

export function getFieldValue<T = unknown>(source: T, field: ResumeFieldPath): unknown {
  if (!field) return source;

  let current: any = source;
  for (const segment of normalizeFieldPath(field)) {
    if (current == null) return undefined;
    current = current[segment];
  }

  return current;
}

export function updateResumeField<T>(source: T, field: ResumeFieldPath, nextValue: unknown): T {
  if (!field) return source;

  const clone = deepClone(source);
  const segments = normalizeFieldPath(field);
  let cursor: any = clone;

  for (let index = 0; index < segments.length - 1; index += 1) {
    const segment = segments[index];
    const nextSegment = segments[index + 1];
    const nextIsArrayIndex = !Number.isNaN(Number(nextSegment)) && Array.isArray(cursor);

    if (cursor == null) {
      return source;
    }

    if (cursor[segment] == null) {
      cursor[segment] = nextIsArrayIndex ? [] : {};
    }

    cursor = cursor[segment];
  }

  const finalSegment = segments[segments.length - 1];

  if (Array.isArray(cursor) && !Number.isNaN(Number(finalSegment))) {
    cursor[Number(finalSegment)] = nextValue;
  } else {
    cursor[finalSegment] = nextValue;
  }

  return clone;
}

export function deleteResumeField<T>(source: T, field: ResumeFieldPath): T {
  if (!field) return source;

  const clone = deepClone(source);
  const segments = normalizeFieldPath(field);
  if (!segments.length) return clone;

  let cursor: any = clone;
  for (let index = 0; index < segments.length - 1; index += 1) {
    const segment = segments[index];
    if (cursor == null) return source;
    cursor = cursor[segment];
  }

  const finalSegment = segments[segments.length - 1];

  if (Array.isArray(cursor)) {
    const arrayIndex = Number(finalSegment);
    if (!Number.isNaN(arrayIndex)) {
      cursor.splice(arrayIndex, 1);
      return clone;
    }
  }

  if (cursor && typeof cursor === "object") {
    const currentValue = cursor[finalSegment];

    if (typeof currentValue === "string") {
      cursor[finalSegment] = "";
    } else if (typeof currentValue === "number") {
      cursor[finalSegment] = 0;
    } else if (typeof currentValue === "boolean") {
      cursor[finalSegment] = false;
    } else if (Array.isArray(currentValue)) {
      cursor[finalSegment] = [];
    } else if (currentValue && typeof currentValue === "object") {
      cursor[finalSegment] = {};
    } else {
      cursor[finalSegment] = "";
    }
  }

  return clone;
}

