"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { toolComputes } from "@/generated/tool-computes";
import { ToolResultView } from "./ToolResultView";
import type { ToolField, ToolInputs } from "@/lib/tool-types";

/** Every field's example value, used as the starting state so a tool shows a
 * live, working result immediately rather than an empty form. */
function defaultsFrom(fields: ToolField[]): ToolInputs {
  const values: ToolInputs = {};
  for (const field of fields) {
    if (field.kind === "list") {
      values[field.token] = field.example;
    } else {
      values[field.token] = field.example;
    }
  }
  return values;
}

function FieldLabel({ label, help }: { label: string; help?: string }) {
  return (
    <span className="mb-1.5 flex flex-col gap-0.5">
      <span className="text-[0.8125rem] font-medium text-ink">{label}</span>
      {help && <span className="text-[0.6875rem] text-ink-faint">{help}</span>}
    </span>
  );
}

const inputClass =
  "w-full rounded-md border border-hairline bg-surface px-3 py-2 text-[0.8125rem] leading-relaxed text-ink outline-none transition-colors duration-200 placeholder:text-ink-faint focus:border-signal/60";

function SingleField({
  field,
  value,
  onChange,
}: {
  field: Exclude<ToolField, { kind: "list" }>;
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  if (field.kind === "number") {
    return (
      <label className="block">
        <FieldLabel label={field.label} help={field.help} />
        <div className="flex items-center gap-2">
          {field.prefix && <span className="text-[0.8125rem] text-ink-faint">{field.prefix}</span>}
          <input
            type="number"
            value={typeof value === "number" ? value : ""}
            min={field.min}
            max={field.max}
            step={field.step ?? "any"}
            placeholder={field.placeholder}
            onChange={(event) => onChange(event.target.value === "" ? "" : Number(event.target.value))}
            className={inputClass}
          />
          {field.suffix && <span className="text-[0.8125rem] text-ink-faint">{field.suffix}</span>}
        </div>
      </label>
    );
  }

  if (field.kind === "text") {
    return (
      <label className="block">
        <FieldLabel label={field.label} help={field.help} />
        <input
          type="text"
          value={typeof value === "string" ? value : ""}
          placeholder={field.placeholder}
          onChange={(event) => onChange(event.target.value)}
          className={inputClass}
        />
      </label>
    );
  }

  if (field.kind === "textarea") {
    return (
      <label className="block">
        <FieldLabel label={field.label} help={field.help} />
        <textarea
          rows={field.rows ?? 4}
          value={typeof value === "string" ? value : ""}
          placeholder={field.placeholder}
          onChange={(event) => onChange(event.target.value)}
          className={cn(inputClass, "resize-y font-mono")}
        />
      </label>
    );
  }

  if (field.kind === "select") {
    return (
      <label className="block">
        <FieldLabel label={field.label} help={field.help} />
        <select
          value={typeof value === "string" ? value : field.example}
          onChange={(event) => onChange(event.target.value)}
          className={inputClass}
        >
          {field.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    );
  }

  if (field.kind === "date") {
    return (
      <label className="block">
        <FieldLabel label={field.label} help={field.help} />
        <input
          type="date"
          value={typeof value === "string" ? value : ""}
          onChange={(event) => onChange(event.target.value)}
          className={inputClass}
        />
      </label>
    );
  }

  // checkbox
  return (
    <label className="flex items-center gap-2.5">
      <input
        type="checkbox"
        checked={Boolean(value)}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 rounded border-hairline accent-signal"
      />
      <span className="text-[0.8125rem] font-medium text-ink">{field.label}</span>
    </label>
  );
}

function ListField({
  field,
  value,
  onChange,
}: {
  field: Extract<ToolField, { kind: "list" }>;
  value: Record<string, unknown>[];
  onChange: (rows: Record<string, unknown>[]) => void;
}) {
  const rows = value.length > 0 ? value : field.example;

  function updateRow(index: number, token: string, next: unknown) {
    const copy = rows.map((row) => ({ ...row }));
    copy[index] = { ...copy[index], [token]: next };
    onChange(copy);
  }

  function addRow() {
    if (field.max && rows.length >= field.max) return;
    onChange([...rows, { ...field.example[0] }]);
  }

  function removeRow(index: number) {
    if (field.min && rows.length <= field.min) return;
    onChange(rows.filter((_, i) => i !== index));
  }

  return (
    <div>
      <FieldLabel label={field.label} help={field.help} />
      <div className="space-y-2.5">
        {rows.map((row, index) => (
          <div key={index} className="flex items-end gap-2 rounded-md border border-hairline bg-surface p-2.5">
            <div className="grid flex-1 gap-2 sm:grid-cols-2">
              {field.fields.map((sub) => (
                <SingleField
                  key={sub.token}
                  field={sub as Exclude<ToolField, { kind: "list" }>}
                  value={row[sub.token]}
                  onChange={(next) => updateRow(index, sub.token, next)}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => removeRow(index)}
              disabled={Boolean(field.min) && rows.length <= (field.min ?? 0)}
              aria-label={`Remove ${field.itemLabel}`}
              className="mb-0.5 rounded-md border border-hairline p-2 text-ink-faint transition-colors duration-200 hover:text-ink disabled:cursor-not-allowed disabled:opacity-30"
            >
              <Icon name="close" size={13} />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addRow}
        disabled={Boolean(field.max) && rows.length >= (field.max ?? Infinity)}
        className="mt-2.5 inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-signal-bright disabled:cursor-not-allowed disabled:opacity-40"
      >
        + Add {field.itemLabel}
      </button>
    </div>
  );
}

/**
 * The one form every tool renders through. Fields are pure data
 * (`ToolField[]`), state lives here, and every change recomputes the result
 * synchronously — there is nothing async and nothing server side, so the
 * result is always in sync with what is on screen.
 *
 * Takes `slug` rather than the compute function itself: a plain function
 * cannot be passed from the server component tree (`ToolShell`) across the
 * client boundary, since only serialisable data crosses it. `toolComputes`
 * is imported here, inside the client module, and looked up by slug instead.
 */
export function ToolForm({
  slug,
  fields,
  accent,
}: {
  slug: string;
  fields: ToolField[];
  accent: string;
}) {
  const [values, setValues] = useState<ToolInputs>(() => defaultsFrom(fields));
  const compute = toolComputes[slug];

  const result = useMemo(() => {
    if (!compute) {
      return { kind: "error" as const, message: "This tool's logic did not register. Run npm run gen and reload." };
    }
    try {
      return compute(values);
    } catch {
      return { kind: "error" as const, message: "That combination of inputs could not be computed. Adjust a value and try again." };
    }
  }, [compute, values]);

  function setField(token: string, next: unknown) {
    setValues((previous) => ({ ...previous, [token]: next }));
  }

  return (
    <div className="overflow-hidden rounded-xl border border-hairline bg-surface-2/40">
      <div className="grid gap-0 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
        <div className="space-y-3.5 border-b border-hairline p-5 lg:border-b-0 lg:border-r">
          <p className="eyebrow">Inputs</p>
          {fields.map((field) =>
            field.kind === "list" ? (
              <ListField
                key={field.token}
                field={field}
                value={(values[field.token] as Record<string, unknown>[]) ?? field.example}
                onChange={(rows) => setField(field.token, rows)}
              />
            ) : (
              <SingleField
                key={field.token}
                field={field}
                value={values[field.token]}
                onChange={(next) => setField(field.token, next)}
              />
            ),
          )}
        </div>

        <div className="p-5">
          <ToolResultView result={result} accent={accent} />
        </div>
      </div>
    </div>
  );
}
