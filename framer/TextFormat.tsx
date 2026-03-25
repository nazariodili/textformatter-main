import * as React from "react"
import { addPropertyControls, ControlType } from "framer"
import {
    ChevronRight,
    Undo2,
    Redo2,
    Copy,
    Trash2,
    RefreshCw,
    ArrowUpDown,
    ArrowRight,
    CopyMinus,
    Pilcrow,
    Tag,
    Scissors,
    Sparkles,
    Languages,
    Hash,
    Search,
    TriangleDashed,
    Eraser,
    Filter,
    X,
} from "lucide-react"

type Props = {
    title: string
    placeholder: string
    height: number
    accent: string
    accent2: string
    background: string
    textColor: string
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

function IconInput({
    label,
    icon,
    value,
    onChange,
    placeholder,
    inputMode,
}: {
    label?: string
    icon: React.ReactNode
    value: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"]
}) {
    return (
        <div style={{ display: "grid", gap: 6 }}>
            {label && (
                <div style={{ fontSize: 12, opacity: 0.65, fontWeight: 600 }}>
                    {label}
                </div>
            )}
            <div className="tf-input-row">
                <div style={{ display: "grid", placeItems: "center" }}>
                    {icon}
                </div>
                <input
                    className="tf-input-field"
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    inputMode={inputMode}
                />
            </div>
        </div>
    )
}

function SecondaryCta({
    label,
    onClick,
}: {
    label: string
    onClick: () => void
}) {
    return (
        <button className="tf-cta-secondary" onClick={onClick}>
            {label}
        </button>
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

export default function TextFormatterFramerResponsive(props: Props) {
    const {
        title,
        placeholder,
        height,
        accent,
        accent2,
        background,
        textColor,
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
        "none" | "transform" | "lines" | "cleanup" | "replace"
    >("none")
    const [activeGroup, setActiveGroup] = React.useState("none")

    const toolsMenuRef = React.useRef<HTMLDivElement | null>(null)

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
            showToast("Text copied")
        } catch {
            showToast("Copy failed")
        }
    }

    const copyStat = async (label: string, value: number) => {
        try {
            await navigator.clipboard.writeText(String(value))
            showToast(`${label} copied`)
        } catch {
            showToast("Copy failed")
        }
    }

    const clearAll = () => {
        applyText("", "Text cleared")
    }

    React.useEffect(() => {
        if (!toolsOpen) return
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node
            if (toolsMenuRef.current && !toolsMenuRef.current.contains(target)) {
                setToolsOpen(false)
            }
        }
        window.addEventListener("mousedown", handleClickOutside)
        return () =>
            window.removeEventListener("mousedown", handleClickOutside)
    }, [toolsOpen])

    const effectiveLines = countEffectiveLines(text)
    const visibleLines = visibleLinesEstimate(text)
    const words = countWords(text)
    const chars = text.length

    const showSidePanel = activeGroup !== "none"

    const sectionMeta: Record<
        string,
        { label: string; icon: React.ReactNode }
    > = {
        transform: { label: "Transform text", icon: <Sparkles size={16} /> },
        lines: { label: "Lines and structure", icon: <Pilcrow size={16} /> },
        cleanup: { label: "Content cleanup", icon: <Eraser size={16} /> },
        replace: {
            label: "Find, replace, and filter",
            icon: <Search size={16} />,
        },
    }

    const groupMeta: Record<
        string,
        { label: string; icon: React.ReactNode }
    > = {
        reversals: { label: "Reversals", icon: <RefreshCw size={16} /> },
        sortings: { label: "Sortings", icon: <ArrowUpDown size={16} /> },
        duplicates: { label: "Duplicates", icon: <CopyMinus size={16} /> },
        linebreaks: { label: "Line breaks", icon: <Pilcrow size={16} /> },
        prefix: { label: "Prefix and suffix", icon: <Tag size={16} /> },
        create_breaks: {
            label: "Create line breaks",
            icon: <Scissors size={16} />,
        },
        spaces: { label: "Empty lines and spaces", icon: <Sparkles size={16} /> },
        accents: { label: "Accents", icon: <Languages size={16} /> },
        numbers: { label: "Number sorting", icon: <Hash size={16} /> },
        replace: { label: "Replace text", icon: <Search size={16} /> },
        filter: { label: "Filter lines", icon: <Filter size={16} /> },
    }

    const panelHeader = (() => {
        if (activeGroup === "none") return { title: "", icon: null }
        const meta = groupMeta[activeGroup]
        if (!meta) return { title: "", icon: null }
        return { title: meta.label, icon: meta.icon }
    })()

    const panelContent = (() => {
        switch (activeGroup) {
            case "reversals":
                return (
                    <div style={{ display: "grid", gap: 8 }}>
                        <SecondaryCta
                            label="Reverse text"
                            onClick={() =>
applyText(reverseText(text), "Text reversed")
                            }
                        />
                        <SecondaryCta
                            label="Reverse words"
                            onClick={() =>
applyText(
                                    reverseWords(text),
                                    "Words reversed"
                                )
                            }
                        />
                        <SecondaryCta
                            label="Reverse letters in each word"
                            onClick={() =>
applyText(
                                    reverseLettersEachWord(text),
                                    "Letters reversed"
                                )
                            }
                        />
                        <SecondaryCta
                            label="Reverse line order"
                            onClick={() =>
applyText(
                                    reverseLinesOrder(text),
                                    "Line order reversed"
                                )
                            }
                        />
                    </div>
                )
            case "sortings":
                return (
                    <div style={{ display: "grid", gap: 8 }}>
                        <SecondaryCta
                            label="Sort lines A–Z"
                            onClick={() =>
applyText(
                                    sortLinesAZ(text),
                                    "Lines sorted A–Z"
                                )
                            }
                        />
                        <SecondaryCta
                            label="Sort lines Z–A"
                            onClick={() =>
applyText(
                                    sortLinesZA(text),
                                    "Lines sorted Z–A"
                                )
                            }
                        />
                        <SecondaryCta
                            label="Sort by length"
                            onClick={() =>
applyText(
                                    sortLinesByLength(text),
                                    "Lines sorted by length"
                                )
                            }
                        />
                        <SecondaryCta
                            label="Add line numbers"
                            onClick={() =>
applyText(
                                    addLineNumbers(text),
                                    "Numbering added"
                                )
                            }
                        />
                    </div>
                )
            case "duplicates":
                return (
                    <div style={{ display: "grid", gap: 8 }}>
                        <SecondaryCta
                            label="Words uniche A-Z"
                            onClick={() =>
applyText(
                                    uniqueWordsAZ(text),
                                    "Duplicates rimossi"
                                )
                            }
                        />
                        <SecondaryCta
                            label="Words uniche Z-A"
                            onClick={() =>
applyText(
                                    uniqueWordsZA(text),
                                    "Duplicates rimossi"
                                )
                            }
                        />
                        <SecondaryCta
                            label="Remove duplicate lines (case-insensitive)"
                            onClick={() =>
applyText(
                                    removeDuplicateLines(text, false),
                                    "Duplicate lines removed"
                                )
                            }
                        />
                        <SecondaryCta
                            label="Remove duplicate lines (case-sensitive)"
                            onClick={() =>
applyText(
                                    removeDuplicateLines(text, true),
                                    "Duplicate lines removed"
                                )
                            }
                        />
                    </div>
                )
            case "linebreaks":
                return (
                    <div style={{ display: "grid", gap: 8 }}>
                        <IconInput
                            label="Replace all line breaks with"
                            icon={<Pilcrow size={18} />}
                            value={replaceBreaksWith}
                            onChange={(e) =>
                                setReplaceBreaksWith(e.target.value)
                            }
                        />
                        <SecondaryCta
                            label="Apply"
                            onClick={() =>
applyText(
                                    replaceLineBreaks(
                                        text,
                                        replaceBreaksWith
                                    ),
                                    "Line breaks sostituiti"
                                )
                            }
                        />
                        <SecondaryCta
                            label="Remove all line breaks"
                            onClick={() =>
applyText(
                                    removeAllLineBreaks(text),
                                    "Line breaks rimossi"
                                )
                            }
                        />
                    </div>
                )
            case "prefix":
                return (
                    <div style={{ display: "grid", gap: 8 }}>
                        <IconInput
                            label="Prefix"
                            icon={<Tag size={18} />}
                            value={prefix}
                            onChange={(e) => setPrefix(e.target.value)}
                        />
                        <IconInput
                            label="Suffix"
                            icon={<Tag size={18} />}
                            value={suffix}
                            onChange={(e) => setSuffix(e.target.value)}
                        />
                        <SecondaryCta
                            label="Apply to all lines"
                            onClick={() =>
applyText(
                                    addPrefixSuffixToLines(
                                        text,
                                        prefix,
                                        suffix
                                    ),
                                    "Prefix and suffix applicati"
                                )
                            }
                        />
                    </div>
                )
            case "create_breaks":
                return (
                    <div style={{ display: "grid", gap: 8 }}>
                        <IconInput
                            label="After word or character"
                            icon={<Scissors size={18} />}
                            value={breakAfter}
                            onChange={(e) => setBreakAfter(e.target.value)}
                        />
                        <SecondaryCta
                            label="Insert line break"
                            onClick={() =>
applyText(
                                    createBreakAfterToken(text, breakAfter),
                                    "Line breaks inseriti"
                                )
                            }
                        />
                        <IconInput
                            label="Every X characters"
                            icon={<Hash size={18} />}
                            value={everyChars}
                            onChange={(e) => setEveryChars(e.target.value)}
                            inputMode="numeric"
                        />
                        <SecondaryCta
                            label="Apply every X characters"
                            onClick={() =>
applyText(
                                    createBreakEveryNChars(
                                        text,
                                        Number(everyChars)
                                    ),
                                    "Line breaks creati"
                                )
                            }
                        />
                    </div>
                )
            case "spaces":
                return (
                    <div style={{ display: "grid", gap: 8 }}>
                        <SecondaryCta
                            label="Remove empty lines"
                            onClick={() =>
applyText(
                                    removeEmptyLines(text),
                                    "Empty lines removed"
                                )
                            }
                        />
                        <SecondaryCta
                            label="Reduce multiple empty lines"
                            onClick={() =>
applyText(
                                    reduceMultipleEmptyLines(text),
                                    "Empty lines reduced"
                                )
                            }
                        />
                        <SecondaryCta
                            label="Remove double spaces (one pass)"
                            onClick={() =>
applyText(
                                    removeDoubleSpacesOnce(text),
                                    "Double spaces reduced"
                                )
                            }
                        />
                        <SecondaryCta
                            label="Remove double spaces (all)"
                            onClick={() =>
applyText(
                                    removeDoubleSpacesAll(text),
                                    "Double spaces removed"
                                )
                            }
                        />
                    </div>
                )
            case "accents":
                return (
                    <div style={{ display: "grid", gap: 8 }}>
                        <SecondaryCta
                            label="Remove accents"
                            onClick={() =>
applyText(
                                    removeAccents(text),
                                    "Accents rimossi"
                                )
                            }
                        />
                        <SecondaryCta
                            label="Accents → apostrofo"
                            onClick={() =>
applyText(
                                    accentToApostrophe(text),
                                    "Accents convertiti"
                                )
                            }
                        />
                    </div>
                )
            case "numbers":
                return (
                    <div style={{ display: "grid", gap: 8 }}>
                        <SecondaryCta
                            label="Sort numbers separated by space"
                            onClick={() =>
applyText(
                                    sortNumbersInLine(text, "space"),
                                    "Numbers sorted"
                                )
                            }
                        />
                        <SecondaryCta
                            label="Sort numbers separated by comma"
                            onClick={() =>
applyText(
                                    sortNumbersInLine(text, "comma"),
                                    "Numbers sorted"
                                )
                            }
                        />
                        <SecondaryCta
                            label="Sort numeric lines"
                            onClick={() =>
applyText(
                                    sortNumericLines(text),
                                    "Numeric lines sorted"
                                )
                            }
                        />
                    </div>
                )
            case "filter":
                return (
                    <div
                        style={{ display: "flex", flexDirection: "column", gap: 8 }}
                    >
                        <IconInput
                            label="Filter word"
                            icon={<Filter size={18} />}
                            value={filterWord}
                            onChange={(e) => setFilterWord(e.target.value)}
                            placeholder="Filter word..."
                        />
                        <div
                            style={{
                                display: "flex",
                                gap: 8,
                                justifyContent: "flex-end",
                                flexWrap: "wrap",
                            }}
                        >
                            <SecondaryCta
                                label="Extract lines"
                                onClick={() =>
                                    applyText(
                                        extractLinesWithWord(text, filterWord),
                                        "Lines extracted"
                                    )
                                }
                            />
                            <SecondaryCta
                                label="Remove lines"
                                onClick={() =>
                                    applyText(
                                        removeLinesWithWord(text, filterWord),
                                        "Lines removed"
                                    )
                                }
                            />
                            <SecondaryCta
                                label="Keep lines"
                                onClick={() =>
                                    applyText(
                                        keepOnlyLinesWithWord(text, filterWord),
                                        "Filter applied"
                                    )
                                }
                            />
                        </div>
                    </div>
                )
            case "none":
                return null
            case "replace":
            default:
                return (
                    <div
                        style={{ display: "flex", flexDirection: "column", gap: 8 }}
                    >
                        <IconInput
                            label="Find"
                            icon={<Search size={18} />}
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder="Find..."
                        />
                        <IconInput
                            label="Replace with"
                            icon={<ArrowRight size={18} />}
                            value={replaceValue}
                            onChange={(e) => setReplaceValue(e.target.value)}
                            placeholder="Replace with..."
                        />
                        <div
                            style={{
                                display: "flex",
                                gap: 8,
                                justifyContent: "flex-end",
                                flexWrap: "wrap",
                            }}
                        >
                            <SecondaryCta
                                label="Replace inside each line"
                                onClick={() =>
                                    applyText(
                                        replaceWordInsideLines(
                                            text,
                                            searchValue,
                                            replaceValue
                                        ),
                                        "Per-line replacement completed"
                                    )
                                }
                            />
                            <SecondaryCta
                                label="Replace all"
                                onClick={() =>
                                    applyText(
                                        replaceTextAll(
                                            text,
                                            searchValue,
                                            replaceValue
                                        ),
                                        "Replacement completed"
                                    )
                                }
                            />
                        </div>
                    </div>
                )
        }
    })()

    return (
        <div
            style={{
                width: "100%",
                height,
                boxSizing: "border-box",
                overflow: "auto",
                background: "transparent",
                color: textColor,
                borderRadius: 0,
                border: "none",
                padding: 0,
                fontFamily:
                    '"Inter", "SF Pro Text", "SF Pro Display", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                position: "relative",
            }}
        >
            <style>{`
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
                .tf-input-row {
                    background: rgba(0, 0, 0, 0.03);
                    border-radius: 12px;
                    padding: 8px;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    border: 1px solid transparent;
                    transition: border-color 140ms ease, background 140ms ease;
                }
                .tf-input-row:focus-within {
                    border-color: #D6DDE8;
                    background: rgba(0, 0, 0, 0.04);
                }
                .tf-input-field {
                    border: none;
                    outline: none;
                    background: transparent;
                    font-size: 14px;
                    color: #1B2437;
                    width: 100%;
                }
                .tf-input-field::placeholder {
                    color: rgba(27, 36, 55, 0.6);
                }
                .tf-cta-secondary {
                    background: #FFFFFF;
                    border: 1px solid #E5E8EF;
                    border-radius: 6px;
                    padding: 4px 6px;
                    font-size: 14px;
                    color: #1B2437;
                    cursor: pointer;
                    transition: background 140ms ease, border-color 140ms ease;
                    white-space: nowrap;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: auto;
                }
                .tf-cta-secondary:hover {
                    background: #F4F6FA;
                    border-color: #DDE2EA;
                }
                .tf-panel-icon-button {
                    background: #FFFFFF;
                    border: 1px solid #E5E8EF;
                    border-radius: 6px;
                    padding: 4px;
                    display: grid;
                    place-items: center;
                    cursor: pointer;
                    transition: background 140ms ease, border-color 140ms ease;
                }
                .tf-panel-icon-button:hover {
                    background: #F4F6FA;
                    border-color: #DDE2EA;
                }
                .tf-stats {
                    display: grid;
                    grid-template-columns: repeat(
                        auto-fit,
                        minmax(160px, 1fr)
                    );
                    border-top: 1px solid rgba(0, 0, 0, 0.03);
                }
                .tf-stat {
                    display: flex;
                    align-items: center;
                    padding: 8px;
                    gap: 8px;
                    border-left: 1px solid rgba(0, 0, 0, 0.03);
                    border-top: 1px solid rgba(0, 0, 0, 0.03);
                }
                .tf-stat:first-child {
                    border-top: none;
                    border-left: none;
                }
                @media (max-width: 519px) {
                    .tf-stat {
                        border-left: none;
                    }
                }
                @media (min-width: 520px) {
                    .tf-stat:nth-child(-n + 2) {
                        border-top: none;
                    }
                }
                @media (min-width: 700px) {
                    .tf-stat:nth-child(-n + 3) {
                        border-top: none;
                    }
                }
                @media (min-width: 900px) {
                    .tf-stat:nth-child(-n + 4) {
                        border-top: none;
                    }
                }
                .tf-menu-popover {
                    animation: tfFadeIn 180ms ease;
                }
                .tf-panel-content {
                    animation: tfFadeIn 200ms ease;
                }
                .tf-tools-menu {
                    display: flex;
                    gap: 8px;
                    align-items: flex-start;
                }
                .tf-main-row {
                    display: grid;
                    gap: 8px;
                    align-items: stretch;
                    transition: grid-template-columns 520ms cubic-bezier(0.16, 1, 0.3, 1);
                }
                @media (max-width: 900px) {
                    .tf-main-row {
                        grid-template-columns: 1fr !important;
                    }
                }
                @media (max-width: 820px) {
                    .tf-tools-menu {
                        flex-direction: column;
                        width: min(92vw, 360px);
                        align-items: flex-end;
                    }
                    .tf-tools-panel {
                        width: 100% !important;
                    }
                    .tf-side-panel {
                        width: 100% !important;
                        flex: 1 1 100% !important;
                    }
                    .tf-menu-popover {
                        right: 0 !important;
                        left: auto !important;
                    }
                }
                @keyframes tfFadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(-6px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
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

                            
                        </div>

                    </div>

                </div>

                    <div
                        className="tf-main-row"
                        style={{
                            gridTemplateColumns: showSidePanel
                                ? "minmax(0, 1fr) 303px"
                                : "minmax(0, 1fr) 0px",
                        }}
                    >
                        <div
                            className="tf-side-panel"
                            style={{
                                background: "#FFFFFF",
                                border: "1px solid #E5E8EF",
                                borderRadius: 14,
                                padding: 8,
                                width: "100%",
                                minWidth: 260,
                                display: "flex",
                                flexDirection: "column",
                                gap: 12,
                                willChange: "width",
                            }}
                        >
                            <div style={{ position: "relative" }}>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        gap: 8,
                                        flexWrap: "wrap",
                                        padding: "6px 8px",
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
                                            label="Capitalize after punctuation"
                                            icon={<span>.Aa</span>}
                                            onClick={() =>
                                                applyText(
                                                    capitalizeAfterPunctuation(
                                                        text
                                                    ),
                                                    "Sentences updated"
                                                )
                                            }
                                            accent={accent}
                                        />
                                        <ToolbarButton
                                            label="All lowercase"
                                            icon={<span>aa</span>}
                                            onClick={() =>
                                                applyText(
                                                    text.toLowerCase(),
                                                    "Converted to lowercase"
                                                )
                                            }
                                            accent={accent}
                                        />
                                        <ToolbarButton
                                            label="Title case"
                                            icon={<span>Ab</span>}
                                            onClick={() =>
                                                applyText(
                                                    toTitleCase(text),
                                                    "Title case applied"
                                                )
                                            }
                                            accent={accent}
                                        />
                                        <ToolbarButton
                                            label="All uppercase"
                                            icon={<span>AB</span>}
                                            onClick={() =>
                                                applyText(
                                                    text.toUpperCase(),
                                                    "Converted to uppercase"
                                                )
                                            }
                                            accent={accent}
                                        />
                                        <ToolbarButton
                                            label="Random case"
                                            icon={<span>aA</span>}
                                            onClick={() =>
                                                applyText(
                                                    randomCase(text),
                                                    "Random case applied"
                                                )
                                            }
                                            accent={accent}
                                        />

                            <div
                                style={{
                                    position: "relative",
                                    display: "inline-flex",
                                }}
                                ref={toolsMenuRef}
                            >
                                            <ToolbarButton
                                                label="More tools"
                                                icon={<span>•••</span>}
                                                onClick={() =>
                                                    setToolsOpen((prev) => !prev)
                                                }
                                                accent={accent}
                                                selected={toolsOpen}
                                            />

                                            {toolsOpen && (
                                            <div
                                                className="tf-menu-popover tf-tools-menu"
                                                style={{
                                                    position: "absolute",
                                                    top: "calc(100% + 8px)",
                                                    left: 0,
                                                    zIndex: 40,
                                                    alignItems: "flex-start",
                                                    maxWidth: "92vw",
                                                    width: "max-content",
                                                }}
                                            >
                                                <div
                                                    className="tf-tools-panel"
                                                    style={{
                                                        width: "min(320px, 90vw)",
                                                        background:
                                                            "#FFFFFF",
                                                        border: "1px solid #E5E8EF",
                                                        borderRadius: 12,
                                                        boxShadow:
                                                            "0 12px 30px rgba(0,0,0,0.14)",
                                                        padding: 8,
                                                    }}
                                                >
                                                        {[
                                                            "transform",
                                                            "lines",
                                                            "cleanup",
                                                            "replace",
                                                        ].map((sectionKey) => (
                                                            <button
                                                                key={sectionKey}
                                                                onClick={() =>
                                                                    setActiveSection(
                                                                        sectionKey as any
                                                                    )
                                                                }
                                                                onMouseEnter={() =>
                                                                    setActiveSection(
                                                                        sectionKey as any
                                                                    )
                                                                }
                                                                className="tf-menu-button"
                                                                data-selected={
                                                                    activeSection ===
                                                                    sectionKey
                                                                        ? "true"
                                                                        : "false"
                                                                }
                                                                style={{
                                                                    width: "100%",
                                                                    background:
                                                                        "transparent",
                                                                    borderRadius: 6,
                                                                    padding:
                                                                        "8px 8px",
                                                                    display:
                                                                        "flex",
                                                                    alignItems:
                                                                        "center",
                                                                    justifyContent:
                                                                        "space-between",
                                                                    fontSize: 14,
                                                                    color: "#1B2437",
                                                                    cursor: "pointer",
                                                                    whiteSpace:
                                                                        "normal",
                                                                }}
                                                            >
                                                                <span
                                                                    style={{
                                                                        display:
                                                                            "flex",
                                                                        alignItems:
                                                                            "center",
                                                                        gap: 6,
                                                                        flex: 1,
                                                                        minWidth: 0,
                                                                    }}
                                                                >
                                                                    {sectionMeta[sectionKey]?.icon}
                                                                    {sectionMeta[sectionKey]?.label}
                                                                </span>
                                                                <ChevronRight size={14} />
                                                            </button>
                                                        ))}
                                                    </div>

                                                <div
                                                    className="tf-tools-panel"
                                                    style={{
                                                        width: "min(300px, 90vw)",
                                                        background:
                                                            "#FFFFFF",
                                                        border: "1px solid #E5E8EF",
                                                        borderRadius: 12,
                                                        boxShadow:
                                                            "0 12px 30px rgba(0,0,0,0.14)",
                                                        padding: 8,
                                                    }}
                                                >
                                                        {(activeSection ===
                                                        "transform"
                                                            ? ["reversals", "sortings"]
                                                            : activeSection ===
                                                                "lines"
                                                              ? [
                                                                    "duplicates",
                                                                    "linebreaks",
                                                                    "prefix",
                                                                    "create_breaks",
                                                                ]
                                                              : activeSection ===
                                                                  "cleanup"
                                                                ? [
                                                                      "spaces",
                                                                      "accents",
                                                                      "numbers",
                                                                  ]
                                                                : ["replace", "filter"]
                                                        ).map((groupKey) => (
                                                            <button
                                                                key={groupKey}
                                                                onClick={() => {
                                                                    setActiveGroup(
                                                                        groupKey
                                                                    )
                                                                    setToolsOpen(
                                                                        false
                                                                    )
                                                                }}
                                                                className="tf-menu-button"
                                                                data-selected={
                                                                    activeGroup ===
                                                                    groupKey
                                                                        ? "true"
                                                                        : "false"
                                                                }
                                                                style={{
                                                                    width: "100%",
                                                                    background:
                                                                        "transparent",
                                                                    borderRadius: 6,
                                                                    padding:
                                                                        "8px 8px",
                                                                    display:
                                                                        "flex",
                                                                    alignItems:
                                                                        "center",
                                                                    gap: 6,
                                                                    fontSize: 14,
                                                                    color: "#1B2437",
                                                                    cursor: "pointer",
                                                                    textAlign:
                                                                        "left",
                                                                whiteSpace:
                                                                    "normal",
                                                            }}
                                                        >
                                                                {groupMeta[groupKey]?.icon}
                                                                {groupMeta[groupKey]?.label}
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
                                            label="Copy"
                                            icon={<Copy size={16} />}
                                            onClick={copyText}
                                            accent={accent}
                                            variant="icon"
                                        />
                                        <ToolbarButton
                                            label="Clear"
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

                            <div
                                className="tf-stats"
                                style={{ margin: "8px -8px -8px" }}
                            >
                                {[
                                    {
                                        label: "Effective lines",
                                        value: effectiveLines,
                                    },
                                    {
                                        label: "Visible lines",
                                        value: visibleLines,
                                    },
                                    { label: "Words", value: words },
                                    { label: "Characters", value: chars },
                                ].map((item, index) => (
                                    <div
                                        key={item.label}
                                        className="tf-stat"
                                    >
                                        <div
                                            style={{
                                                fontSize: 14,
                                                color: "#1B2437",
                                                flex: "1 1 auto",
                                                minWidth: 0,
                                            }}
                                        >
                                            {item.label}:{" "}
                                            <strong>{item.value}</strong>
                                        </div>
                                        <button
                                            className="tf-panel-icon-button"
                                            onClick={() =>
                                                copyStat(
                                                    item.label,
                                                    item.value
                                                )
                                            }
                                            aria-label={`Copy ${item.label}`}
                                        >
                                            <Copy size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div
                            style={{
                                background: "#FFFFFF",
                                border: "1px solid #E5E8EF",
                                borderRadius: 14,
                                padding: 8,
                                width: "100%",
                                minWidth: 0,
                                display: "flex",
                                flexDirection: "column",
                                gap: 24,
                                overflow: "hidden",
                                opacity: showSidePanel ? 1 : 0,
                                transform: showSidePanel
                                    ? "translateX(0)"
                                    : "translateX(8px)",
                                pointerEvents: showSidePanel ? "auto" : "none",
                                transition:
                                    "opacity 220ms ease, transform 220ms ease",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 8,
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 4,
                                        flex: "1 1 auto",
                                        minWidth: 0,
                                    }}
                                >
                                    {panelHeader.icon}
                                    <div
                                        style={{
                                            fontSize: 14,
                                            fontWeight: 600,
                                            color: "#1B2437",
                                        }}
                                    >
                                        {panelHeader.title}
                                    </div>
                                </div>
                                <button
                                    className="tf-panel-icon-button"
                                    onClick={() => setActiveGroup("none")}
                                    aria-label="Close panel"
                                >
                                    <X size={16} />
                                </button>
                            </div>

                            <div className="tf-panel-content">
                                {panelContent}
                            </div>
                        </div>
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
    placeholder: "Paste or type your text here…",
    height: 1100,
    accent: "#1B2437",
    accent2: "#C63D2F",
    background: "#F6F6F7",
    textColor: "#1B2437",
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
    textColor: {
        type: ControlType.Color,
        title: "Text",
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
