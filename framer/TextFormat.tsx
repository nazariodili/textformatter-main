import * as React from "react"
import { addPropertyControls, ControlType } from "framer"
import {
    ChevronDown,
    ChevronRight,
    Undo2,
    Redo2,
    MousePointerClick,
    Copy,
    Eraser,
    Trash2,
    RefreshCw,
    ArrowUpDown,
    CopyMinus,
    Pilcrow,
    Tag,
    Scissors,
    Sparkles,
    Languages,
    Hash,
    Search,
    Filter,
} from "lucide-react"

type Props = {
    title: string
    placeholder: string
    height: number
    accent: string
    accent2: string
    background: string
    panelColor: string
    textColor: string
    mutedTextColor: string
    borderColor: string
    radius: number
    fontSize: number
}

function countWords(text: string) {
    const trimmed = text.trim()
    if (!trimmed) return 0
    return trimmed.split(/\s+/).filter(Boolean).length
}

function countEffectiveLines(text: string) {
    if (!text) return 0
    return text.split("\n").length
}

function visibleLinesEstimate(text: string) {
    return text.split("\n").length
}

function toTitleCase(text: string) {
    return text.replace(/\S+/g, (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })
}

function capitalizeAfterPunctuation(text: string) {
    const lower = text.toLowerCase()
    let out = ""
    let shouldCap = true

    for (let i = 0; i < lower.length; i++) {
        const char = lower[i]

        if (shouldCap && /[a-zàèéìòùáíóúâêîôûäëïöü]/i.test(char)) {
            out += char.toUpperCase()
            shouldCap = false
        } else {
            out += char
        }

        if (char === "." || char === "!" || char === "?") {
            shouldCap = true
        }
    }

    return out
}

function randomCase(text: string) {
    return text
        .split("")
        .map((char) => {
            if (!/[a-zàèéìòùáíóúâêîôûäëïöü]/i.test(char)) return char
            return Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase()
        })
        .join("")
}

function reverseText(text: string) {
    return text.split("").reverse().join("")
}

function reverseWords(text: string) {
    return text.split(/\s+/).filter(Boolean).reverse().join(" ")
}

function reverseLettersEachWord(text: string) {
    return text.replace(/\S+/g, (word) => word.split("").reverse().join(""))
}

function reverseLinesOrder(text: string) {
    return text.split("\n").reverse().join("\n")
}

function sortLinesAZ(text: string) {
    return text
        .split("\n")
        .sort((a, b) => a.localeCompare(b, "it", { sensitivity: "base" }))
        .join("\n")
}

function sortLinesZA(text: string) {
    return text
        .split("\n")
        .sort((a, b) => b.localeCompare(a, "it", { sensitivity: "base" }))
        .join("\n")
}

function sortLinesByLength(text: string) {
    return text
        .split("\n")
        .sort((a, b) => a.length - b.length)
        .join("\n")
}

function uniqueWordsAZ(text: string) {
    const unique = Array.from(new Set(text.split(/\s+/).filter(Boolean)))
    return unique
        .sort((a, b) => a.localeCompare(b, "it", { sensitivity: "base" }))
        .join("\n")
}

function uniqueWordsZA(text: string) {
    const unique = Array.from(new Set(text.split(/\s+/).filter(Boolean)))
    return unique
        .sort((a, b) => b.localeCompare(a, "it", { sensitivity: "base" }))
        .join("\n")
}

function removeDuplicateLines(text: string, caseSensitive = false) {
    const lines = text.split("\n")
    const seen = new Set<string>()
    const result: string[] = []

    for (const line of lines) {
        const key = caseSensitive ? line : line.toLowerCase()
        if (!seen.has(key)) {
            seen.add(key)
            result.push(line)
        }
    }

    return result.join("\n")
}

function replaceLineBreaks(text: string, replacement: string) {
    return text.replace(/\r?\n/g, replacement)
}

function removeAllLineBreaks(text: string) {
    return text.replace(/\r?\n/g, "")
}

function addPrefixSuffixToLines(text: string, prefix: string, suffix: string) {
    return text
        .split("\n")
        .map((line) => `${prefix}${line}${suffix}`)
        .join("\n")
}

function createBreakAfterToken(text: string, token: string) {
    if (!token) return text
    return text.split(token).join(token + "\n")
}

function createBreakEveryNChars(text: string, n: number) {
    if (!n || n <= 0) return text
    const parts: string[] = []
    for (let i = 0; i < text.length; i += n) {
        parts.push(text.slice(i, i + n))
    }
    return parts.join("\n")
}

function removeEmptyLines(text: string) {
    return text
        .split("\n")
        .filter((line) => line.trim() !== "")
        .join("\n")
}

function reduceMultipleEmptyLines(text: string) {
    return text.replace(/\n{3,}/g, "\n\n")
}

function removeAccents(text: string) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

function accentToApostrophe(text: string) {
    const map: Record<string, string> = {
        à: "a'",
        è: "e'",
        é: "e'",
        ì: "i'",
        ò: "o'",
        ù: "u'",
        À: "A'",
        È: "E'",
        É: "E'",
        Ì: "I'",
        Ò: "O'",
        Ù: "U'",
    }
    return text.replace(/[àèéìòùÀÈÉÌÒÙ]/g, (char) => map[char] || char)
}

function removeDoubleSpacesOnce(text: string) {
    return text.replace(/  /g, " ")
}

function removeDoubleSpacesAll(text: string) {
    return text.replace(/\s{2,}/g, " ")
}

function addLineNumbers(text: string) {
    return text
        .split("\n")
        .map((line, index) => `${index + 1}. ${line}`)
        .join("\n")
}

function sortNumbersInLine(text: string, separator: "space" | "comma") {
    const sep = separator === "space" ? /\s+/ : /\s*,\s*/
    const joiner = separator === "space" ? " " : ", "
    const nums = text
        .split(sep)
        .map((v) => Number(v))
        .filter((v) => !Number.isNaN(v))
        .sort((a, b) => a - b)
    return nums.join(joiner)
}

function sortNumericLines(text: string) {
    return text
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .sort((a, b) => Number(a) - Number(b))
        .join("\n")
}

function replaceTextAll(text: string, search: string, replacement: string) {
    if (!search) return text
    return text.split(search).join(replacement)
}

function extractLinesWithWord(text: string, word: string) {
    if (!word) return text
    return text
        .split("\n")
        .filter((line) => line.includes(word))
        .join("\n")
}

function removeLinesWithWord(text: string, word: string) {
    if (!word) return text
    return text
        .split("\n")
        .filter((line) => !line.includes(word))
        .join("\n")
}

function keepOnlyLinesWithWord(text: string, word: string) {
    if (!word) return text
    return text
        .split("\n")
        .filter((line) => line.includes(word))
        .join("\n")
}

function replaceWordInsideLines(
    text: string,
    search: string,
    replacement: string
) {
    if (!search) return text
    return text
        .split("\n")
        .map((line) => line.split(search).join(replacement))
        .join("\n")
}

function ActionButton({
    label,
    icon,
    iconOnly = false,
    onClick,
    accent,
    secondary = false,
    selected = false,
}: {
    label: string
    icon?: React.ReactNode
    iconOnly?: boolean
    onClick: () => void
    accent: string
    secondary?: boolean
    selected?: boolean
}) {
    const baseBg = secondary ? "#FFFFFF" : accent
    const baseBorder = secondary ? "#E5E8EF" : accent
    const baseShadow = secondary
        ? "0 1px 0 rgba(10, 15, 30, 0.02)"
        : "0 1px 2px rgba(12, 16, 32, 0.16)"
    const hoverBg = secondary ? "#F5F7FB" : accent
    const hoverBorder = secondary ? "#DDE3EC" : accent
    const hoverShadow = secondary
        ? "0 1px 0 rgba(10, 15, 30, 0.04)"
        : "0 2px 6px rgba(12, 16, 32, 0.18)"
    const selectedBg = secondary ? "#E9EEF6" : accent
    const selectedBorder = secondary ? "#D6DDE8" : accent

    return (
        <button
            onClick={onClick}
            className="tf-action-button"
            data-icon-only={iconOnly ? "true" : "false"}
            data-selected={selected ? "true" : "false"}
            data-variant={secondary ? "secondary" : "primary"}
            style={{
                width: iconOnly ? 28 : "100%",
                minWidth: iconOnly ? 28 : undefined,
                minHeight: 28,
                height: iconOnly ? 28 : "auto",
                padding: iconOnly ? 0 : "6px 8px",
                borderRadius: 6,
                color: secondary ? "#1B2437" : "white",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                textAlign: iconOnly ? "center" : "left",
                display: "flex",
                alignItems: "center",
                justifyContent: iconOnly ? "center" : "flex-start",
                gap: 7,
                lineHeight: 1.2,
                transition:
                    "transform 120ms ease, box-shadow 140ms ease, filter 140ms ease",
                boxSizing: "border-box",
                ["--btn-bg" as any]: baseBg,
                ["--btn-border" as any]: baseBorder,
                ["--btn-shadow" as any]: baseShadow,
                ["--btn-bg-hover" as any]: hoverBg,
                ["--btn-border-hover" as any]: hoverBorder,
                ["--btn-shadow-hover" as any]: hoverShadow,
                ["--btn-bg-selected" as any]: selectedBg,
                ["--btn-border-selected" as any]: selectedBorder,
            }}
            aria-label={label}
            title={label}
        >
            {icon}
            {!iconOnly && <span>{label}</span>}
        </button>
    )
}

function ToolbarButton({
    label,
    icon,
    onClick,
    accent,
    variant = "ghost",
    selected = false,
}: {
    label: string
    icon: React.ReactNode
    onClick: () => void
    accent: string
    variant?: "ghost" | "icon"
    selected?: boolean
}) {
    const isIcon = variant === "icon"
    return (
        <button
            onClick={onClick}
            aria-label={label}
            title={label}
            className="tf-toolbar-button"
            data-selected={selected ? "true" : "false"}
            style={{
                width: isIcon ? 24 : "auto",
                height: 24,
                padding: isIcon ? 4 : "2px 6px",
                borderRadius: 6,
                color: "#1B2437",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxSizing: "border-box",
                fontSize: 12,
                fontWeight: 600,
                ["--btn-bg" as any]: isIcon ? "#FFFFFF" : "transparent",
                ["--btn-border" as any]: isIcon
                    ? "#E5E8EF"
                    : "transparent",
                ["--btn-shadow" as any]: isIcon
                    ? "0 1px 0 rgba(10, 15, 30, 0.04)"
                    : "none",
                ["--btn-bg-hover" as any]: isIcon ? "#F4F6FA" : "#F4F6FA",
                ["--btn-border-hover" as any]: isIcon
                    ? "#DDE2EA"
                    : "#DDE2EA",
                ["--btn-shadow-hover" as any]: isIcon
                    ? "0 1px 0 rgba(10, 15, 30, 0.06)"
                    : "0 1px 0 rgba(10, 15, 30, 0.04)",
                ["--btn-bg-selected" as any]: "#E9EEF6",
                ["--btn-border-selected" as any]: "#D6DDE8",
            }}
        >
            {icon}
        </button>
    )
}

function InputField(
    props: React.InputHTMLAttributes<HTMLInputElement> & { label?: string }
) {
    const { label, ...rest } = props

    return (
        <div style={{ display: "grid", gap: 6 }}>
            {label && (
                <div style={{ fontSize: 12, opacity: 0.65, fontWeight: 600 }}>
                    {label}
                </div>
            )}
            <input
                {...rest}
                className="tf-input"
                style={{
                    width: "100%",
                    minHeight: 34,
                    borderRadius: 12,
                    padding: "8px 10px",
                    outline: "none",
                    fontSize: 14,
                    boxSizing: "border-box",
                    color: "#1B2437",
                    ...(rest.style || {}),
                }}
            />
        </div>
    )
}

function Card({
    children,
    background = "white",
}: {
    children: React.ReactNode
    background?: string
}) {
    return (
        <div
            style={{
                background,
                border: "1px solid #E5E8EF",
                borderRadius: 14,
                padding: 8,
                boxShadow: "0 1px 0 rgba(10, 15, 30, 0.02)",
            }}
        >
            {children}
        </div>
    )
}

function Accordion({
    title,
    subtitle,
    icon,
    defaultOpen = false,
    children,
}: {
    title: string
    subtitle?: string
    icon?: React.ReactNode
    defaultOpen?: boolean
    children: React.ReactNode
}) {
    const [open, setOpen] = React.useState(defaultOpen)

    return (
        <div
            style={{
                border: "1px solid #E2E7F0",
                borderRadius: 10,
                background: "white",
                overflow: "hidden",
                boxShadow: "0 1px 1px rgba(20, 28, 45, 0.04)",
            }}
        >
            <button
                onClick={() => setOpen(!open)}
                style={{
                    width: "100%",
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    padding: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                    textAlign: "left",
                }}
            >
                <div style={{ minWidth: 0 }}>
                    <div
                        style={{
                            fontSize: 13,
                            fontWeight: 700,
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                        }}
                    >
                        {icon}
                        <span>{title}</span>
                    </div>
                    {subtitle && (
                        <div
                            style={{
                                fontSize: 11,
                                color: "#6B7385",
                                marginTop: 4,
                                lineHeight: 1.35,
                            }}
                        >
                            {subtitle}
                        </div>
                    )}
                </div>

                <div
                    style={{
                        width: 24,
                        height: 24,
                        borderRadius: 6,
                        display: "grid",
                        placeItems: "center",
                        border: "1px solid #E4E8F0",
                        background: "#F7F9FC",
                        flex: "0 0 auto",
                        transform: open ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 260ms ease",
                        fontSize: 14,
                        fontWeight: 700,
                    }}
                >
                    <ChevronDown size={16} strokeWidth={2.4} />
                </div>
            </button>

            <div
                style={{
                    display: "grid",
                    gridTemplateRows: open ? "1fr" : "0fr",
                    transition: "grid-template-rows 320ms ease",
                }}
            >
                <div style={{ overflow: "hidden" }}>
                    <div
                        style={{
                            padding: open
                                ? "0 10px 10px 10px"
                                : "0 10px 0 10px",
                            opacity: open ? 1 : 0,
                            transform: open
                                ? "translateY(0px)"
                                : "translateY(-6px)",
                            transition:
                                "opacity 220ms ease, transform 280ms ease, padding 280ms ease",
                        }}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function TextFormatterFramerResponsive(props: Props) {
    const {
        title,
        placeholder,
        height,
        accent,
        accent2,
        background,
        panelColor,
        textColor,
        mutedTextColor,
        borderColor,
        radius,
        fontSize,
    } = props

    const [text, setText] = React.useState("")
    const [toast, setToast] = React.useState("")

    const [history, setHistory] = React.useState<string[]>([""])
    const [historyIndex, setHistoryIndex] = React.useState(0)

    const [replaceBreaksWith, setReplaceBreaksWith] = React.useState("")
    const [prefix, setPrefix] = React.useState("")
    const [suffix, setSuffix] = React.useState("")
    const [breakAfter, setBreakAfter] = React.useState("")
    const [everyChars, setEveryChars] = React.useState("")
    const [searchValue, setSearchValue] = React.useState("")
    const [replaceValue, setReplaceValue] = React.useState("")
    const [filterWord, setFilterWord] = React.useState("")
    const [toolsOpen, setToolsOpen] = React.useState(false)
    const [activeSection, setActiveSection] = React.useState<
        "trasforma" | "righe" | "pulisci" | "sostituisci"
    >("trasforma")
    const [activeGroup, setActiveGroup] = React.useState("inversioni")

    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null)

    const showToast = React.useCallback((message: string) => {
        setToast(message)
    }, [])

    React.useEffect(() => {
        if (!toast) return
        const timeout = window.setTimeout(() => setToast(""), 1800)
        return () => window.clearTimeout(timeout)
    }, [toast])

    const pushHistory = React.useCallback(
        (next: string) => {
            setHistory((prev) => {
                const trimmed = prev.slice(0, historyIndex + 1)
                if (trimmed[trimmed.length - 1] === next) return trimmed
                return [...trimmed, next]
            })
            setHistoryIndex((prev) => prev + 1)
        },
        [historyIndex]
    )

    const applyText = React.useCallback(
        (next: string, successMessage?: string) => {
            setText(next)
            setHistory((prev) => {
                const trimmed = prev.slice(0, historyIndex + 1)
                if (trimmed[trimmed.length - 1] === next) return trimmed
                const newHistory = [...trimmed, next]
                setHistoryIndex(newHistory.length - 1)
                return newHistory
            })
            if (successMessage) showToast(successMessage)
        },
        [historyIndex, showToast]
    )

    const onTextChange = (value: string) => {
        setText(value)
    }

    const commitTextSnapshot = React.useCallback(() => {
        if (history[historyIndex] !== text) {
            pushHistory(text)
        }
    }, [history, historyIndex, pushHistory, text])

    const undo = () => {
        if (historyIndex <= 0) return
        const nextIndex = historyIndex - 1
        setHistoryIndex(nextIndex)
        setText(history[nextIndex])
        showToast("Undo")
    }

    const redo = () => {
        if (historyIndex >= history.length - 1) return
        const nextIndex = historyIndex + 1
        setHistoryIndex(nextIndex)
        setText(history[nextIndex])
        showToast("Redo")
    }

    const copyText = async () => {
        try {
            await navigator.clipboard.writeText(text)
            showToast("Testo copiato")
        } catch {
            showToast("Copia non riuscita")
        }
    }

    const selectAll = () => {
        if (!textareaRef.current) return
        textareaRef.current.focus()
        textareaRef.current.select()
        showToast("Testo selezionato")
    }

    const clearAll = () => {
        applyText("", "Testo cancellato")
    }

    const resetFields = () => {
        setReplaceBreaksWith("")
        setPrefix("")
        setSuffix("")
        setBreakAfter("")
        setEveryChars("")
        setSearchValue("")
        setReplaceValue("")
        setFilterWord("")
        showToast("Campi azzerati")
    }

    const effectiveLines = countEffectiveLines(text)
    const visibleLines = visibleLinesEstimate(text)
    const words = countWords(text)
    const chars = text.length

    return (
        <div
            style={{
                width: "100%",
                height,
                boxSizing: "border-box",
                overflow: "auto",
                background: background || "#F6F6F7",
                color: textColor,
                borderRadius: Math.max(12, radius),
                border: "1px solid #E5E8EF",
                padding: 16,
                fontFamily:
                    '"Inter", "SF Pro Text", "SF Pro Display", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                position: "relative",
            }}
        >
            <style>{`
                .tf-action-button {
                    background: var(--btn-bg);
                    border: 1px solid var(--btn-border);
                    box-shadow: var(--btn-shadow);
                }
                .tf-action-button:hover {
                    background: var(--btn-bg-hover);
                    border-color: var(--btn-border-hover);
                    box-shadow: var(--btn-shadow-hover);
                    filter: brightness(0.98);
                }
                .tf-action-button[data-selected="true"] {
                    background: var(--btn-bg-selected);
                    border-color: var(--btn-border-selected);
                }
                .tf-action-button:active {
                    transform: translateY(1px);
                }
                .tf-toolbar-button {
                    background: var(--btn-bg);
                    border: 1px solid var(--btn-border);
                    box-shadow: var(--btn-shadow);
                }
                .tf-toolbar-button:hover {
                    background: var(--btn-bg-hover);
                    border-color: var(--btn-border-hover);
                    box-shadow: var(--btn-shadow-hover);
                }
                .tf-toolbar-button[data-selected="true"] {
                    background: var(--btn-bg-selected);
                    border-color: var(--btn-border-selected);
                }
                .tf-toolbar-button:active {
                    transform: translateY(1px);
                }
                .tf-menu-button {
                    transition: background 140ms ease, border-color 140ms ease;
                    border: 1px solid transparent;
                }
                .tf-menu-button:hover {
                    background: rgba(27, 36, 55, 0.04);
                }
                .tf-menu-button[data-selected="true"] {
                    background: #E9EEF6;
                    border-color: #D6DDE8;
                }
                .tf-input {
                    background: rgba(27, 36, 55, 0.03);
                    border: 1px solid transparent;
                    transition: border-color 140ms ease, background 140ms ease;
                }
                .tf-input:focus {
                    border-color: #D6DDE8;
                    background: rgba(27, 36, 55, 0.04);
                }
                .tf-input::placeholder {
                    color: rgba(27, 36, 55, 0.6);
                }
            `}</style>
            <div
                style={{
                    background: panelColor,
                    borderRadius: 14,
                    padding: 8,
                    minHeight: "100%",
                    boxSizing: "border-box",
                    border: `1px solid ${borderColor}`,
                }}
            >
                <div
                    style={{
                        position: "sticky",
                        top: 0,
                        zIndex: 20,
                        marginBottom: 12,
                        background: "transparent",
                        borderRadius: 0,
                        padding: 0,
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "flex-start",
                            justifyContent: "space-between",
                            gap: 12,
                            flexWrap: "wrap",
                            marginBottom: 10,
                        }}
                    >
                        <div
                            style={{
                                flex: "1 1 320px",
                                minWidth: 0,
                            }}
                        >
                            <div
                                style={{
                                    fontSize: 20,
                                    fontWeight: 700,
                                    lineHeight: 1.1,
                                    wordBreak: "break-word",
                                }}
                            >
                                {title}
                            </div>

                            <div
                                style={{
                                    fontSize: 11,
                                    color: mutedTextColor,
                                    marginTop: 4,
                                    lineHeight: 1.35,
                                }}
                            >
                                Workspace in stile editor Figma
                            </div>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 6,
                                justifyContent: "flex-end",
                                flex: "0 1 auto",
                                minWidth: 0,
                                maxWidth: "100%",
                            }}
                        >
                            <ActionButton
                                label="Undo"
                                icon={<Undo2 size={16} />}
                                iconOnly
                                onClick={undo}
                                accent={accent}
                                secondary
                            />
                            <ActionButton
                                label="Redo"
                                icon={<Redo2 size={16} />}
                                iconOnly
                                onClick={redo}
                                accent={accent}
                                secondary
                            />
                            <ActionButton
                                label="Seleziona testo"
                                icon={<MousePointerClick size={16} />}
                                iconOnly
                                onClick={selectAll}
                                accent={accent}
                                secondary
                            />
                            <ActionButton
                                label="Azzera parametri"
                                icon={<Eraser size={16} />}
                                iconOnly
                                onClick={resetFields}
                                accent={accent}
                                secondary
                            />
                            <ActionButton
                                label="Copia"
                                icon={<Copy size={16} />}
                                iconOnly
                                onClick={copyText}
                                accent={accent}
                            />
                            <ActionButton
                                label="Cancella testo"
                                icon={<Trash2 size={16} />}
                                iconOnly
                                onClick={clearAll}
                                accent={accent2}
                            />
                        </div>
                    </div>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit, minmax(130px, 1fr))",
                            gap: 8,
                            marginBottom: 10,
                        }}
                    >
                        {[
                            { label: "Linee effettive", value: effectiveLines },
                            { label: "Linee a schermo", value: visibleLines },
                            { label: "Parole", value: words },
                            { label: "Caratteri", value: chars },
                        ].map((item) => (
                            <div
                                key={item.label}
                                style={{
                                    background: "#FFFFFF",
                                    border: "1px solid #E5E8EF",
                                    borderRadius: 8,
                                    padding: 10,
                                    minWidth: 0,
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: 11,
                                        color: "#73809A",
                                        marginBottom: 4,
                                        fontWeight: 600,
                                        lineHeight: 1.3,
                                    }}
                                >
                                    {item.label}
                                </div>
                                <div
                                    style={{
                                        fontSize: 18,
                                        fontWeight: 700,
                                        wordBreak: "break-word",
                                    }}
                                >
                                    {item.value}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div
                        style={{
                            fontSize: 12,
                            fontWeight: 700,
                            letterSpacing: 0.2,
                            color: "#52607A",
                        }}
                    >
                        Trasforma — workspace unificato
                    </div>
                </div>

                <Card background={panelColor}>
                    <div style={{ position: "relative" }}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 8,
                            flexWrap: "wrap",
                            padding: "6px 8px",
                            marginBottom: 8,
                            borderRadius: 12,
                            background: "rgba(27, 36, 55, 0.03)",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                                flexWrap: "wrap",
                                minWidth: 0,
                                flex: "1 1 320px",
                            }}
                        >
                            <ToolbarButton
                                label="Maiuscolo dopo punto"
                                icon={<span>.Aa</span>}
                                onClick={() =>
                                    applyText(
                                        capitalizeAfterPunctuation(text),
                                        "Frasi aggiornate"
                                    )
                                }
                                accent={accent}
                            />
                            <ToolbarButton
                                label="Tutto minuscolo"
                                icon={<span>aa</span>}
                                onClick={() =>
                                    applyText(
                                        text.toLowerCase(),
                                        "Convertito in minuscolo"
                                    )
                                }
                                accent={accent}
                            />
                            <ToolbarButton
                                label="Iniziali maiuscole"
                                icon={<span>Ab</span>}
                                onClick={() =>
                                    applyText(
                                        toTitleCase(text),
                                        "Iniziali aggiornate"
                                    )
                                }
                                accent={accent}
                            />
                            <ToolbarButton
                                label="Tutto maiuscolo"
                                icon={<span>AB</span>}
                                onClick={() =>
                                    applyText(
                                        text.toUpperCase(),
                                        "Convertito in maiuscolo"
                                    )
                                }
                                accent={accent}
                            />
                            <ToolbarButton
                                label="Maiuscole casuali"
                                icon={<span>aA</span>}
                                onClick={() =>
                                    applyText(
                                        randomCase(text),
                                        "Case casuale applicato"
                                    )
                                }
                                accent={accent}
                            />

                            <div
                                style={{
                                    position: "relative",
                                    display: "inline-flex",
                                }}
                            >
                                <ToolbarButton
                                    label="Altri strumenti"
                                    icon={<span>•••</span>}
                                    onClick={() =>
                                        setToolsOpen((prev) => !prev)
                                    }
                                    accent={accent}
                                    selected={toolsOpen}
                                />

                                {toolsOpen && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "calc(100% + 8px)",
                                            left: 0,
                                            zIndex: 40,
                                            display: "flex",
                                            gap: 8,
                                            alignItems: "flex-start",
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: 300,
                                                background: "#FFFFFF",
                                                border: "1px solid #E5E8EF",
                                                borderRadius: 12,
                                                boxShadow:
                                                    "0 12px 30px rgba(0,0,0,0.14)",
                                                padding: 8,
                                            }}
                                        >
                                            {[
                                                {
                                                    key: "trasforma",
                                                    label: "Trasforma testo",
                                                },
                                                {
                                                    key: "righe",
                                                    label: "Righe e struttura",
                                                },
                                                {
                                                    key: "pulisci",
                                                    label: "Pulizia contenuto",
                                                },
                                                {
                                                    key: "sostituisci",
                                                    label: "Cerca, sostituisci e filtra",
                                                },
                                            ].map((section) => (
                                                <button
                                                    key={section.key}
                                                    onClick={() =>
                                                        setActiveSection(
                                                            section.key as any
                                                        )
                                                    }
                                                    className="tf-menu-button"
                                                    data-selected={
                                                        activeSection ===
                                                        section.key
                                                            ? "true"
                                                            : "false"
                                                    }
                                                    style={{
                                                        width: "100%",
                                                        background: "transparent",
                                                        borderRadius: 6,
                                                        padding: "8px 8px",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent:
                                                            "space-between",
                                                        fontSize: 14,
                                                        color: "#1B2437",
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                            gap: 6,
                                                        }}
                                                    >
                                                        <span>◬</span>
                                                        {section.label}
                                                    </span>
                                                    <ChevronRight size={14} />
                                                </button>
                                            ))}
                                        </div>

                                        <div
                                            style={{
                                                width: 280,
                                                background: "#FFFFFF",
                                                border: "1px solid #E5E8EF",
                                                borderRadius: 12,
                                                boxShadow:
                                                    "0 12px 30px rgba(0,0,0,0.14)",
                                                padding: 8,
                                            }}
                                        >
                                            {(activeSection === "trasforma"
                                                ? [
                                                      {
                                                          key: "inversioni",
                                                          label: "Inversioni",
                                                      },
                                                      {
                                                          key: "ordinamenti",
                                                          label: "Ordinamenti",
                                                      },
                                                  ]
                                                : activeSection === "righe"
                                                  ? [
                                                        {
                                                            key: "duplicati",
                                                            label: "Duplicati",
                                                        },
                                                        {
                                                            key: "capoversi",
                                                            label: "Capoversi",
                                                        },
                                                        {
                                                            key: "prefisso",
                                                            label: "Prefisso e suffisso",
                                                        },
                                                        {
                                                            key: "crea",
                                                            label: "Crea capoversi",
                                                        },
                                                    ]
                                                  : activeSection === "pulisci"
                                                    ? [
                                                          {
                                                              key: "spazi",
                                                              label: "Righe vuote e spazi",
                                                          },
                                                          {
                                                              key: "accenti",
                                                              label: "Accenti",
                                                          },
                                                          {
                                                              key: "numeri",
                                                              label: "Ordinamento numeri",
                                                          },
                                                      ]
                                                    : [
                                                          {
                                                              key: "sostituisci",
                                                              label: "Sostituisci testo",
                                                          },
                                                          {
                                                              key: "filtra",
                                                              label: "Filtra righe",
                                                          },
                                                      ]
                                            ).map((group) => (
                                                <button
                                                    key={group.key}
                                                    onClick={() => {
                                                        setActiveGroup(
                                                            group.key
                                                        )
                                                        setToolsOpen(false)
                                                    }}
                                                    className="tf-menu-button"
                                                    data-selected={
                                                        activeGroup ===
                                                        group.key
                                                            ? "true"
                                                            : "false"
                                                    }
                                                    style={{
                                                        width: "100%",
                                                        background: "transparent",
                                                        borderRadius: 6,
                                                        padding: "8px 8px",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 6,
                                                        fontSize: 14,
                                                        color: "#1B2437",
                                                        cursor: "pointer",
                                                        textAlign: "left",
                                                    }}
                                                >
                                                    <span>◬</span>
                                                    {group.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                gap: 6,
                                flexWrap: "wrap",
                                justifyContent: "flex-end",
                                flex: "0 1 auto",
                            }}
                        >
                            <ToolbarButton
                                label="Undo"
                                icon={<Undo2 size={16} />}
                                onClick={undo}
                                accent={accent}
                                variant="icon"
                            />
                            <ToolbarButton
                                label="Redo"
                                icon={<Redo2 size={16} />}
                                onClick={redo}
                                accent={accent}
                                variant="icon"
                            />
                            <ToolbarButton
                                label="Copia"
                                icon={<Copy size={16} />}
                                onClick={copyText}
                                accent={accent}
                                variant="icon"
                            />
                            <ToolbarButton
                                label="Cancella"
                                icon={<Trash2 size={16} />}
                                onClick={clearAll}
                                accent={accent}
                                variant="icon"
                            />
                        </div>
                    </div>
                </div>

                <textarea
                    value={text}
                    ref={textareaRef}
                    placeholder={placeholder}
                    onChange={(e) => onTextChange(e.target.value)}
                    onBlur={commitTextSnapshot}
                    style={{
                        width: "100%",
                        minHeight: 260,
                        resize: "vertical",
                        border: "none",
                        outline: "none",
                        background: "transparent",
                        color: textColor,
                        fontSize,
                        lineHeight: 1.5,
                        fontFamily: "inherit",
                        boxSizing: "border-box",
                    }}
                />

                <div style={{ marginTop: 10 }}>
                    {activeGroup === "inversioni" && (
                        <Accordion
                            title="Inversioni"
                            icon={<RefreshCw size={16} />}
                            defaultOpen
                        >
                            <div style={{ display: "grid", gap: 8 }}>
                                <ActionButton
                                    label="Inverti testo"
                                    onClick={() =>
                                        applyText(
                                            reverseText(text),
                                            "Testo invertito"
                                        )
                                    }
                                    accent={accent}
                                />
                                <ActionButton
                                    label="Inverti parole"
                                    onClick={() =>
                                        applyText(
                                            reverseWords(text),
                                            "Parole invertite"
                                        )
                                    }
                                    accent={accent}
                                    secondary
                                />
                                <ActionButton
                                    label="Inverti lettere di ogni parola"
                                    onClick={() =>
                                        applyText(
                                            reverseLettersEachWord(text),
                                            "Lettere invertite"
                                        )
                                    }
                                    accent={accent}
                                    secondary
                                />
                                <ActionButton
                                    label="Capovolgi ordine righe"
                                    onClick={() =>
                                        applyText(
                                            reverseLinesOrder(text),
                                            "Ordine righe invertito"
                                        )
                                    }
                                    accent={accent}
                                    secondary
                                />
                            </div>
                        </Accordion>
                    )}

                    {activeGroup === "ordinamenti" && (
                        <Accordion
                            title="Ordinamenti"
                            icon={<ArrowUpDown size={16} />}
                            defaultOpen
                        >
                            <div style={{ display: "grid", gap: 8 }}>
                                <ActionButton
                                    label="Ordina righe A-Z"
                                    onClick={() =>
                                        applyText(
                                            sortLinesAZ(text),
                                            "Righe ordinate A-Z"
                                        )
                                    }
                                    accent={accent}
                                />
                                <ActionButton
                                    label="Ordina righe Z-A"
                                    onClick={() =>
                                        applyText(
                                            sortLinesZA(text),
                                            "Righe ordinate Z-A"
                                        )
                                    }
                                    accent={accent}
                                    secondary
                                />
                                <ActionButton
                                    label="Ordina per lunghezza"
                                    onClick={() =>
                                        applyText(
                                            sortLinesByLength(text),
                                            "Righe ordinate per lunghezza"
                                        )
                                    }
                                    accent={accent}
                                    secondary
                                />
                                <ActionButton
                                    label="Aggiungi numerazione righe"
                                    onClick={() =>
                                        applyText(
                                            addLineNumbers(text),
                                            "Numerazione aggiunta"
                                        )
                                    }
                                    accent={accent}
                                    secondary
                                />
                            </div>
                        </Accordion>
                    )}

                    {activeGroup === "duplicati" && (
                        <Accordion
                            title="Duplicati"
                            icon={<CopyMinus size={16} />}
                            defaultOpen
                        >
                            <div style={{ display: "grid", gap: 8 }}>
                                <ActionButton
                                    label="Parole uniche A-Z"
                                    onClick={() =>
                                        applyText(
                                            uniqueWordsAZ(text),
                                            "Duplicati rimossi"
                                        )
                                    }
                                    accent={accent}
                                />
                                <ActionButton
                                    label="Parole uniche Z-A"
                                    onClick={() =>
                                        applyText(
                                            uniqueWordsZA(text),
                                            "Duplicati rimossi"
                                        )
                                    }
                                    accent={accent}
                                    secondary
                                />
                                <ActionButton
                                    label="Rimuovi righe duplicate (insensibile)"
                                    onClick={() =>
                                        applyText(
                                            removeDuplicateLines(text, false),
                                            "Righe duplicate rimosse"
                                        )
                                    }
                                    accent={accent}
                                    secondary
                                />
                                <ActionButton
                                    label="Rimuovi righe duplicate (sensibile)"
                                    onClick={() =>
                                        applyText(
                                            removeDuplicateLines(text, true),
                                            "Righe duplicate rimosse"
                                        )
                                    }
                                    accent={accent}
                                    secondary
                                />
                            </div>
                        </Accordion>
                    )}

                    {activeGroup === "capoversi" && (
                        <Accordion
                            title="Capoversi"
                            icon={<Pilcrow size={16} />}
                            defaultOpen
                        >
                            <div style={{ display: "grid", gap: 8 }}>
                                <InputField
                                    label="Sostituisci tutti i capoversi con"
                                    value={replaceBreaksWith}
                                    onChange={(e) =>
                                        setReplaceBreaksWith(e.target.value)
                                    }
                                />
                                <ActionButton
                                    label="Applica"
                                    onClick={() =>
                                        applyText(
                                            replaceLineBreaks(
                                                text,
                                                replaceBreaksWith
                                            ),
                                            "Capoversi sostituiti"
                                        )
                                    }
                                    accent={accent}
                                />
                                <ActionButton
                                    label="Rimuovi tutti i capoversi"
                                    onClick={() =>
                                        applyText(
                                            removeAllLineBreaks(text),
                                            "Capoversi rimossi"
                                        )
                                    }
                                    accent={accent}
                                    secondary
                                />
                            </div>
                        </Accordion>
                    )}

                    {activeGroup === "prefisso" && (
                        <Accordion
                            title="Prefisso e suffisso"
                            icon={<Tag size={16} />}
                            defaultOpen
                        >
                            <div style={{ display: "grid", gap: 8 }}>
                                <InputField
                                    label="Prefisso"
                                    value={prefix}
                                    onChange={(e) => setPrefix(e.target.value)}
                                />
                                <InputField
                                    label="Suffisso"
                                    value={suffix}
                                    onChange={(e) => setSuffix(e.target.value)}
                                />
                                <ActionButton
                                    label="Applica a tutte le righe"
                                    onClick={() =>
                                        applyText(
                                            addPrefixSuffixToLines(
                                                text,
                                                prefix,
                                                suffix
                                            ),
                                            "Prefisso e suffisso applicati"
                                        )
                                    }
                                    accent={accent}
                                />
                            </div>
                        </Accordion>
                    )}

                    {activeGroup === "crea" && (
                        <Accordion
                            title="Crea capoversi"
                            icon={<Scissors size={16} />}
                            defaultOpen
                        >
                            <div style={{ display: "grid", gap: 8 }}>
                                <InputField
                                    label="Dopo parola o carattere"
                                    value={breakAfter}
                                    onChange={(e) =>
                                        setBreakAfter(e.target.value)
                                    }
                                />
                                <ActionButton
                                    label="Inserisci capoverso"
                                    onClick={() =>
                                        applyText(
                                            createBreakAfterToken(
                                                text,
                                                breakAfter
                                            ),
                                            "Capoversi inseriti"
                                        )
                                    }
                                    accent={accent}
                                />
                                <InputField
                                    label="Ogni X caratteri"
                                    value={everyChars}
                                    onChange={(e) =>
                                        setEveryChars(e.target.value)
                                    }
                                    inputMode="numeric"
                                />
                                <ActionButton
                                    label="Applica ogni X caratteri"
                                    onClick={() =>
                                        applyText(
                                            createBreakEveryNChars(
                                                text,
                                                Number(everyChars)
                                            ),
                                            "Capoversi creati"
                                        )
                                    }
                                    accent={accent}
                                    secondary
                                />
                            </div>
                        </Accordion>
                    )}

                    {activeGroup === "spazi" && (
                        <Accordion
                            title="Righe vuote e spazi"
                            icon={<Sparkles size={16} />}
                            defaultOpen
                        >
                            <div style={{ display: "grid", gap: 8 }}>
                                <ActionButton
                                    label="Rimuovi righe vuote"
                                    onClick={() =>
                                        applyText(
                                            removeEmptyLines(text),
                                            "Righe vuote rimosse"
                                        )
                                    }
                                    accent={accent}
                                />
                                <ActionButton
                                    label="Riduci righe vuote multiple"
                                    onClick={() =>
                                        applyText(
                                            reduceMultipleEmptyLines(text),
                                            "Righe vuote ridotte"
                                        )
                                    }
                                    accent={accent}
                                    secondary
                                />
                                <ActionButton
                                    label="Elimina spazi doppi (1 passata)"
                                    onClick={() =>
                                        applyText(
                                            removeDoubleSpacesOnce(text),
                                            "Spazi doppi ridotti"
                                        )
                                    }
                                    accent={accent}
                                    secondary
                                />
                                <ActionButton
                                    label="Elimina spazi doppi (tutti)"
                                    onClick={() =>
                                        applyText(
                                            removeDoubleSpacesAll(text),
                                            "Spazi doppi rimossi"
                                        )
                                    }
                                    accent={accent}
                                    secondary
                                />
                            </div>
                        </Accordion>
                    )}

                    {activeGroup === "accenti" && (
                        <Accordion
                            title="Accenti"
                            icon={<Languages size={16} />}
                            defaultOpen
                        >
                            <div style={{ display: "grid", gap: 8 }}>
                                <ActionButton
                                    label="Rimuovi accenti"
                                    onClick={() =>
                                        applyText(
                                            removeAccents(text),
                                            "Accenti rimossi"
                                        )
                                    }
                                    accent={accent}
                                />
                                <ActionButton
                                    label="Accenti → apostrofo"
                                    onClick={() =>
                                        applyText(
                                            accentToApostrophe(text),
                                            "Accenti convertiti"
                                        )
                                    }
                                    accent={accent}
                                    secondary
                                />
                            </div>
                        </Accordion>
                    )}

                    {activeGroup === "numeri" && (
                        <Accordion
                            title="Ordinamento numeri"
                            icon={<Hash size={16} />}
                            defaultOpen
                        >
                            <div style={{ display: "grid", gap: 8 }}>
                                <ActionButton
                                    label="Ordina numeri separati da spazio"
                                    onClick={() =>
                                        applyText(
                                            sortNumbersInLine(text, "space"),
                                            "Numeri ordinati"
                                        )
                                    }
                                    accent={accent}
                                />
                                <ActionButton
                                    label="Ordina numeri separati da virgola"
                                    onClick={() =>
                                        applyText(
                                            sortNumbersInLine(text, "comma"),
                                            "Numeri ordinati"
                                        )
                                    }
                                    accent={accent}
                                    secondary
                                />
                                <ActionButton
                                    label="Ordina righe numeriche"
                                    onClick={() =>
                                        applyText(
                                            sortNumericLines(text),
                                            "Righe numeriche ordinate"
                                        )
                                    }
                                    accent={accent}
                                    secondary
                                />
                            </div>
                        </Accordion>
                    )}

                    {activeGroup === "sostituisci" && (
                        <Accordion
                            title="Sostituisci testo"
                            icon={<Search size={16} />}
                            defaultOpen
                        >
                            <div style={{ display: "grid", gap: 8 }}>
                                <InputField
                                    label="Cerca"
                                    value={searchValue}
                                    onChange={(e) =>
                                        setSearchValue(e.target.value)
                                    }
                                />
                                <InputField
                                    label="Sostituisci con"
                                    value={replaceValue}
                                    onChange={(e) =>
                                        setReplaceValue(e.target.value)
                                    }
                                />
                                <ActionButton
                                    label="Sostituisci tutto"
                                    onClick={() =>
                                        applyText(
                                            replaceTextAll(
                                                text,
                                                searchValue,
                                                replaceValue
                                            ),
                                            "Sostituzione completata"
                                        )
                                    }
                                    accent={accent}
                                />
                                <ActionButton
                                    label="Sostituisci dentro ogni riga"
                                    onClick={() =>
                                        applyText(
                                            replaceWordInsideLines(
                                                text,
                                                searchValue,
                                                replaceValue
                                            ),
                                            "Sostituzione per riga completata"
                                        )
                                    }
                                    accent={accent}
                                    secondary
                                />
                            </div>
                        </Accordion>
                    )}

                    {activeGroup === "filtra" && (
                        <Accordion
                            title="Filtra righe"
                            icon={<Filter size={16} />}
                            defaultOpen
                        >
                            <div style={{ display: "grid", gap: 8 }}>
                                <InputField
                                    label="Parola filtro"
                                    value={filterWord}
                                    onChange={(e) =>
                                        setFilterWord(e.target.value)
                                    }
                                />
                                <ActionButton
                                    label="Estrai righe con la parola"
                                    onClick={() =>
                                        applyText(
                                            extractLinesWithWord(
                                                text,
                                                filterWord
                                            ),
                                            "Righe estratte"
                                        )
                                    }
                                    accent={accent}
                                />
                                <ActionButton
                                    label="Rimuovi righe con la parola"
                                    onClick={() =>
                                        applyText(
                                            removeLinesWithWord(
                                                text,
                                                filterWord
                                            ),
                                            "Righe rimosse"
                                        )
                                    }
                                    accent={accent}
                                    secondary
                                />
                                <ActionButton
                                    label="Mantieni solo righe con la parola"
                                    onClick={() =>
                                        applyText(
                                            keepOnlyLinesWithWord(
                                                text,
                                                filterWord
                                            ),
                                            "Filtro applicato"
                                        )
                                    }
                                    accent={accent}
                                    secondary
                                />
                            </div>
                        </Accordion>
                    )}
                </div>
            </Card>
            </div>

            {toast && (
                <div
                    style={{
                        position: "fixed",
                        right: 24,
                        bottom: 24,
                        zIndex: 9999,
                        background: "#111",
                        color: "white",
                        padding: "12px 14px",
                        borderRadius: 14,
                        fontSize: 14,
                        fontWeight: 600,
                        boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                        maxWidth: "calc(100vw - 32px)",
                    }}
                >
                    {toast}
                </div>
            )}
        </div>
    )
}

TextFormatterFramerResponsive.defaultProps = {
    title: "Text Formatter",
    placeholder: "Incolla o scrivi qui il tuo testo…",
    height: 1100,
    accent: "#1B2437",
    accent2: "#C63D2F",
    background: "#F6F6F7",
    panelColor: "#FFFFFF",
    textColor: "#1B2437",
    mutedTextColor: "rgba(27,36,55,0.6)",
    borderColor: "#E5E8EF",
    radius: 24,
    fontSize: 15,
}

addPropertyControls(TextFormatterFramerResponsive, {
    title: {
        type: ControlType.String,
        title: "Title",
    },
    placeholder: {
        type: ControlType.String,
        title: "Placeholder",
    },
    height: {
        type: ControlType.Number,
        title: "Height",
        min: 700,
        max: 2200,
        step: 20,
        unit: "px",
    },
    accent: {
        type: ControlType.Color,
        title: "Accent",
    },
    accent2: {
        type: ControlType.Color,
        title: "Accent 2",
    },
    background: {
        type: ControlType.Color,
        title: "Background",
    },
    panelColor: {
        type: ControlType.Color,
        title: "Panels",
    },
    textColor: {
        type: ControlType.Color,
        title: "Text",
    },
    mutedTextColor: {
        type: ControlType.Color,
        title: "Muted",
    },
    borderColor: {
        type: ControlType.Color,
        title: "Border",
    },
    radius: {
        type: ControlType.Number,
        title: "Radius",
        min: 0,
        max: 40,
        step: 1,
    },
    fontSize: {
        type: ControlType.Number,
        title: "Font",
        min: 12,
        max: 22,
        step: 1,
    },
})
