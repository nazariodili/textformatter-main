import * as React from "react"
import { createRoot } from "react-dom/client"
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

// FIX 5: visibleLinesEstimate ora stima le righe visive considerando
// il wrapping approssimativo (basato su ~80 caratteri per riga come default).
function visibleLinesEstimate(text: string, charsPerLine = 80) {
    if (!text) return 0
    return text.split("\n").reduce((total, line) => {
        return total + Math.max(1, Math.ceil(line.length / charsPerLine))
    }, 0)
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
    disabled = false,
}: {
    label: string
    icon: React.ReactNode
    onClick: () => void
    accent: string
    variant?: "ghost" | "icon"
    selected?: boolean
    disabled?: boolean
}) {
    const isIcon = variant === "icon"
    const buttonRef = React.useRef<HTMLButtonElement | null>(null)
    const tooltipRef = React.useRef<HTMLSpanElement | null>(null)

    const updateTooltip = React.useCallback(() => {
        const button = buttonRef.current
        const tooltip = tooltipRef.current
        if (!button || !tooltip) return

        const padding = 8
        const buttonRect = button.getBoundingClientRect()
        const tooltipRect = tooltip.getBoundingClientRect()
        const viewportW = window.innerWidth
        const viewportH = window.innerHeight
        const gap = 12

        const spaceTop = buttonRect.top
        const spaceBottom = viewportH - buttonRect.bottom
        const spaceLeft = buttonRect.left
        const spaceRight = viewportW - buttonRect.right

        const fitsTop = spaceTop >= tooltipRect.height + gap
        const fitsBottom = spaceBottom >= tooltipRect.height + gap
        const fitsLeft = spaceLeft >= tooltipRect.width + gap
        const fitsRight = spaceRight >= tooltipRect.width + gap

        let placement: "top" | "right" | "left" | "bottom" = "top"
        if (fitsTop) placement = "top"
        else if (fitsRight) placement = "right"
        else if (fitsLeft) placement = "left"
        else if (fitsBottom) placement = "bottom"
        else {
            const options = [
                { key: "top", value: spaceTop - tooltipRect.height },
                { key: "right", value: spaceRight - tooltipRect.width },
                { key: "left", value: spaceLeft - tooltipRect.width },
                { key: "bottom", value: spaceBottom - tooltipRect.height },
            ] as const
            options.sort((a, b) => b.value - a.value)
            placement = options[0].key
        }

        let shiftX = 0
        let shiftY = 0
        if (placement === "top" || placement === "bottom") {
            const centerX = buttonRect.left + buttonRect.width / 2
            const tooltipHalf = tooltipRect.width / 2
            const left = centerX - tooltipHalf
            const right = centerX + tooltipHalf

            if (left < padding) shiftX = padding - left
            if (right > viewportW - padding)
                shiftX = viewportW - padding - right
        } else {
            const centerY = buttonRect.top + buttonRect.height / 2
            const tooltipHalf = tooltipRect.height / 2
            const top = centerY - tooltipHalf
            const bottom = centerY + tooltipHalf

            if (top < padding) shiftY = padding - top
            if (bottom > viewportH - padding)
                shiftY = viewportH - padding - bottom
        }

        button.dataset.tooltipPlacement = placement
        tooltip.style.setProperty("--tt-shift-x", `${shiftX}px`)
        tooltip.style.setProperty("--tt-shift-y", `${shiftY}px`)
    }, [])

    return (
        <button
            onClick={onClick}
            onMouseEnter={updateTooltip}
            onFocus={updateTooltip}
            aria-label={label}
            title={label}
            className="tf-toolbar-button"
            data-variant={variant}
            data-selected={selected ? "true" : "false"}
            data-tooltip={label}
            ref={buttonRef}
            disabled={disabled}
            style={{
                width: "auto",
                minWidth: 24,
                height: 24,
                padding: isIcon ? "4px 6px" : "2px 6px",
                borderRadius: 6,
                color: "#1B2437",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: disabled ? "not-allowed" : "pointer",
                boxSizing: "border-box",
                fontSize: 12,
                fontWeight: 600,
                opacity: disabled ? 0.45 : 1,
                ["--btn-bg" as any]: isIcon ? "#FFFFFF" : "transparent",
                ["--btn-border" as any]: isIcon ? "#E5E8EF" : "transparent",
                ["--btn-shadow" as any]: isIcon
                    ? "0 1px 0 rgba(10, 15, 30, 0.04)"
                    : "none",
                ["--btn-bg-hover" as any]: isIcon ? "#F4F6FA" : "#F4F6FA",
                ["--btn-border-hover" as any]: isIcon ? "#DDE2EA" : "#DDE2EA",
                ["--btn-shadow-hover" as any]: isIcon
                    ? "0 1px 0 rgba(10, 15, 30, 0.06)"
                    : "0 1px 0 rgba(10, 15, 30, 0.04)",
                ["--btn-bg-selected" as any]: "#E9EEF6",
                ["--btn-border-selected" as any]: "#D6DDE8",
            }}
        >
            <span className="tf-toolbar-icon">{icon}</span>
            <span className="tf-toolbar-tooltip" ref={tooltipRef}>
                {label}
            </span>
            <span className="tf-toolbar-tooltip-caret" aria-hidden="true" />
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

function TextFormatter(props: Props) {
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
    const [selectionInfo, setSelectionInfo] = React.useState<{
        count: number
        textCount: number
    }>({ count: 0, textCount: 0 })
    const applyTextRef = React.useRef<(next: string, message?: string) => void>(
        () => {}
    )

    // FIX 4: history gestita con useRef per evitare closure stale.
    const historyRef = React.useRef<string[]>([""])
    const historyIndexRef = React.useRef(0)
    // Stato separato solo per forzare re-render quando necessario.
    const [, forceUpdate] = React.useReducer((x) => x + 1, 0)

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
    // FIX 3: activeGroup separato da toolsOpen — il pannello laterale si apre
    // solo al click, non al semplice hover nel menu.
    const [activeGroup, setActiveGroup] = React.useState("none")
    const [hoveredGroup, setHoveredGroup] = React.useState("none")

    const toolsMenuRef = React.useRef<HTMLDivElement | null>(null)
    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null)
    const textRef = React.useRef(text)
    textRef.current = text

    const showToast = React.useCallback((message: string) => {
        setToast(message)
    }, [])

    React.useEffect(() => {
        if (!toast) return
        const timeout = window.setTimeout(() => setToast(""), 1800)
        return () => window.clearTimeout(timeout)
    }, [toast])

    React.useEffect(() => {
        const handler = (event: MessageEvent) => {
            const msg = (event.data as { pluginMessage?: any })?.pluginMessage
            if (!msg) return
            if (msg.type === "selectionInfo") {
                setSelectionInfo({
                    count: Number(msg.count) || 0,
                    textCount: Number(msg.textCount) || 0,
                })
                return
            }
            if (msg.type === "selectionText") {
                const incoming =
                    typeof msg.text === "string" ? msg.text : ""
                if (incoming.trim().length > 0) {
                    applyTextRef.current(
                        incoming,
                        "Imported from selection"
                    )
                } else {
                    showToast("No text selected")
                }
            }
        }
        window.addEventListener("message", handler)
        return () => window.removeEventListener("message", handler)
    }, [showToast])

    const requestSelectionText = React.useCallback(() => {
        parent.postMessage({ pluginMessage: { type: "getSelectionText" } }, "*")
    }, [])

    const applyToSelection = React.useCallback(() => {
        parent.postMessage(
            { pluginMessage: { type: "applyToSelection", text } },
            "*"
        )
        showToast("Applied to selection")
    }, [showToast, text])

    // FIX 4: pushHistory e applyText usano ref per leggere sempre il valore
    // corrente di historyIndex senza dipendere dalla closure.
    const pushHistory = React.useCallback((next: string) => {
        const idx = historyIndexRef.current
        const trimmed = historyRef.current.slice(0, idx + 1)
        if (trimmed[trimmed.length - 1] === next) return
        historyRef.current = [...trimmed, next]
        historyIndexRef.current = historyRef.current.length - 1
    }, [])

    const applyText = React.useCallback(
        (next: string, successMessage?: string) => {
            setText(next)
            pushHistory(next)
            if (successMessage) showToast(successMessage)
            forceUpdate()
        },
        [pushHistory, showToast]
    )
    applyTextRef.current = applyText

    const onTextChange = (value: string) => {
        setText(value)
    }

    const commitTextSnapshot = React.useCallback(() => {
        const current = textRef.current
        const idx = historyIndexRef.current
        if (historyRef.current[idx] !== current) {
            pushHistory(current)
            forceUpdate()
        }
    }, [pushHistory])

    const undo = () => {
        if (historyIndexRef.current <= 0) return
        historyIndexRef.current -= 1
        setText(historyRef.current[historyIndexRef.current])
        showToast("Undo")
        forceUpdate()
    }

    const redo = () => {
        if (historyIndexRef.current >= historyRef.current.length - 1) return
        historyIndexRef.current += 1
        setText(historyRef.current[historyIndexRef.current])
        showToast("Redo")
        forceUpdate()
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
            if (
                toolsMenuRef.current &&
                !toolsMenuRef.current.contains(target)
            ) {
                setToolsOpen(false)
            }
        }
        window.addEventListener("mousedown", handleClickOutside)
        return () => window.removeEventListener("mousedown", handleClickOutside)
    }, [toolsOpen])

    const effectiveLines = countEffectiveLines(text)
    const visibleLines = visibleLinesEstimate(text)
    const words = countWords(text)
    const chars = text.length

    const showSidePanel = activeGroup !== "none"

    const sectionMeta: Record<string, { label: string; icon: React.ReactNode }> =
        {
            transform: {
                label: "Transform text",
                icon: <Sparkles size={16} />,
            },
            lines: {
                label: "Lines and structure",
                icon: <Pilcrow size={16} />,
            },
            cleanup: { label: "Content cleanup", icon: <Eraser size={16} /> },
            replace: {
                label: "Find, replace, and filter",
                icon: <Search size={16} />,
            },
        }

    const groupMeta: Record<string, { label: string; icon: React.ReactNode }> =
        {
            reversals: { label: "Reversals", icon: <RefreshCw size={16} /> },
            sortings: { label: "Sortings", icon: <ArrowUpDown size={16} /> },
            duplicates: {
                label: "Duplicates",
                icon: <CopyMinus size={16} />,
            },
            linebreaks: {
                label: "Line breaks",
                icon: <Pilcrow size={16} />,
            },
            prefix: { label: "Prefix and suffix", icon: <Tag size={16} /> },
            create_breaks: {
                label: "Create line breaks",
                icon: <Scissors size={16} />,
            },
            spaces: {
                label: "Empty lines and spaces",
                icon: <Sparkles size={16} />,
            },
            accents: { label: "Accents", icon: <Languages size={16} /> },
            numbers: {
                label: "Number sorting",
                icon: <Hash size={16} />,
            },
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
        const renderActions = (
            actions: { label: string; onClick: () => void }[]
        ) => (
            <div style={{ display: "grid", gap: 8 }}>
                {actions.map((action) => (
                    <SecondaryCta
                        key={action.label}
                        label={action.label}
                        onClick={action.onClick}
                    />
                ))}
            </div>
        )

        switch (activeGroup) {
            case "reversals":
                return renderActions([
                    {
                        label: "Reverse text",
                        onClick: () =>
                            applyText(reverseText(text), "Text reversed"),
                    },
                    {
                        label: "Reverse words",
                        onClick: () =>
                            applyText(reverseWords(text), "Words reversed"),
                    },
                    {
                        label: "Reverse letters in each word",
                        onClick: () =>
                            applyText(
                                reverseLettersEachWord(text),
                                "Letters reversed"
                            ),
                    },
                    {
                        label: "Reverse line order",
                        onClick: () =>
                            applyText(
                                reverseLinesOrder(text),
                                "Line order reversed"
                            ),
                    },
                ])
            case "sortings":
                return renderActions([
                    {
                        label: "Sort lines A–Z",
                        onClick: () =>
                            applyText(sortLinesAZ(text), "Lines sorted A–Z"),
                    },
                    {
                        label: "Sort lines Z–A",
                        onClick: () =>
                            applyText(sortLinesZA(text), "Lines sorted Z–A"),
                    },
                    {
                        label: "Sort by length",
                        onClick: () =>
                            applyText(
                                sortLinesByLength(text),
                                "Lines sorted by length"
                            ),
                    },
                    {
                        label: "Add line numbers",
                        onClick: () =>
                            applyText(addLineNumbers(text), "Numbering added"),
                    },
                ])
            case "duplicates":
                return renderActions([
                    {
                        label: "Unique words A–Z",
                        onClick: () =>
                            applyText(uniqueWordsAZ(text), "Duplicates removed"),
                    },
                    {
                        label: "Unique words Z–A",
                        onClick: () =>
                            applyText(uniqueWordsZA(text), "Duplicates removed"),
                    },
                    {
                        label: "Remove duplicate lines (case-insensitive)",
                        onClick: () =>
                            applyText(
                                removeDuplicateLines(text, false),
                                "Duplicate lines removed"
                            ),
                    },
                    {
                        label: "Remove duplicate lines (case-sensitive)",
                        onClick: () =>
                            applyText(
                                removeDuplicateLines(text, true),
                                "Duplicate lines removed"
                            ),
                    },
                ])
            case "linebreaks":
                return (
                    <div style={{ display: "grid", gap: 8 }}>
                        <IconInput
                            label="Replace all line breaks with"
                            icon={<Pilcrow size={18} />}
                            value={replaceBreaksWith}
                            onChange={(e) => setReplaceBreaksWith(e.target.value)}
                        />
                        <SecondaryCta
                            label="Apply"
                            onClick={() =>
                                applyText(
                                    replaceLineBreaks(text, replaceBreaksWith),
                                    "Line breaks replaced"
                                )
                            }
                        />
                        <SecondaryCta
                            label="Remove all line breaks"
                            onClick={() =>
                                applyText(
                                    removeAllLineBreaks(text),
                                    "Line breaks removed"
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
                                    addPrefixSuffixToLines(text, prefix, suffix),
                                    "Prefix and suffix applied"
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
                                    "Line breaks inserted"
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
                                    "Line breaks created"
                                )
                            }
                        />
                    </div>
                )
            case "spaces":
                return renderActions([
                    {
                        label: "Remove empty lines",
                        onClick: () =>
                            applyText(
                                removeEmptyLines(text),
                                "Empty lines removed"
                            ),
                    },
                    {
                        label: "Reduce multiple empty lines",
                        onClick: () =>
                            applyText(
                                reduceMultipleEmptyLines(text),
                                "Empty lines reduced"
                            ),
                    },
                    {
                        label: "Remove double spaces (one pass)",
                        onClick: () =>
                            applyText(
                                removeDoubleSpacesOnce(text),
                                "Double spaces reduced"
                            ),
                    },
                    {
                        label: "Remove double spaces (all)",
                        onClick: () =>
                            applyText(
                                removeDoubleSpacesAll(text),
                                "Double spaces removed"
                            ),
                    },
                ])
            case "accents":
                return renderActions([
                    {
                        label: "Remove accents",
                        onClick: () =>
                            applyText(removeAccents(text), "Accents removed"),
                    },
                    {
                        label: "Accents → apostrophe",
                        onClick: () =>
                            applyText(
                                accentToApostrophe(text),
                                "Accents converted"
                            ),
                    },
                ])
            case "numbers":
                return renderActions([
                    {
                        label: "Sort numbers separated by space",
                        onClick: () =>
                            applyText(
                                sortNumbersInLine(text, "space"),
                                "Numbers sorted"
                            ),
                    },
                    {
                        label: "Sort numbers separated by comma",
                        onClick: () =>
                            applyText(
                                sortNumbersInLine(text, "comma"),
                                "Numbers sorted"
                            ),
                    },
                    {
                        label: "Sort numeric lines",
                        onClick: () =>
                            applyText(
                                sortNumericLines(text),
                                "Numeric lines sorted"
                            ),
                    },
                ])
            case "filter":
                return (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 8,
                        }}
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
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 8,
                        }}
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
            className="tf-root"
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
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    white-space: nowrap;
                    position: relative;
                    transition: background 140ms ease, border-color 140ms ease,
                        box-shadow 140ms ease, padding 160ms ease;
                }
                .tf-toolbar-button[data-variant="icon"] {
                    width: 24px;
                    min-width: 24px;
                    padding: 4px;
                    justify-content: center;
                    gap: 0;
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
                .tf-toolbar-icon {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                }
                .tf-toolbar-tooltip {
                    position: absolute;
                    background: rgba(17, 17, 17, 0.92);
                    color: #fff;
                    padding: 6px 8px;
                    border-radius: 8px;
                    font-size: 12px;
                    font-weight: 400;
                    white-space: nowrap;
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 160ms ease, transform 160ms ease;
                    z-index: 10;
                }
                .tf-toolbar-tooltip-caret {
                    position: absolute;
                    left: 50%;
                    border-width: 6px 6px 0 6px;
                    border-style: solid;
                    border-color: rgba(17, 17, 17, 0.92) transparent transparent transparent;
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 160ms ease, transform 160ms ease;
                    z-index: 9;
                }
                .tf-toolbar-button[data-tooltip-placement="top"]
                    .tf-toolbar-tooltip {
                    bottom: calc(100% + 8px);
                    left: 50%;
                    transform: translateX(
                            calc(-50% + var(--tt-shift-x, 0px))
                        )
                        translateY(2px);
                }
                .tf-toolbar-button[data-tooltip-placement="top"]
                    .tf-toolbar-tooltip-caret {
                    bottom: calc(100% + 2px);
                    transform: translateX(-50%);
                }
                .tf-toolbar-button[data-tooltip-placement="bottom"]
                    .tf-toolbar-tooltip {
                    top: calc(100% + 8px);
                    left: 50%;
                    transform: translateX(
                            calc(-50% + var(--tt-shift-x, 0px))
                        )
                        translateY(-2px);
                }
                .tf-toolbar-button[data-tooltip-placement="bottom"]
                    .tf-toolbar-tooltip-caret {
                    top: calc(100% + 2px);
                    transform: translateX(-50%) rotate(180deg);
                }
                .tf-toolbar-button[data-tooltip-placement="left"]
                    .tf-toolbar-tooltip {
                    right: calc(100% + 8px);
                    top: 50%;
                    transform: translateY(
                            calc(-50% + var(--tt-shift-y, 0px))
                        )
                        translateX(2px);
                }
                .tf-toolbar-button[data-tooltip-placement="left"]
                    .tf-toolbar-tooltip-caret {
                    right: calc(100% + 2px);
                    top: 50%;
                    transform: translateY(-50%) rotate(90deg);
                }
                .tf-toolbar-button[data-tooltip-placement="right"]
                    .tf-toolbar-tooltip {
                    left: calc(100% + 8px);
                    top: 50%;
                    transform: translateY(
                            calc(-50% + var(--tt-shift-y, 0px))
                        )
                        translateX(-2px);
                }
                .tf-toolbar-button[data-tooltip-placement="right"]
                    .tf-toolbar-tooltip-caret {
                    left: calc(100% + 2px);
                    top: 50%;
                    transform: translateY(-50%) rotate(-90deg);
                }
                .tf-toolbar-button:hover .tf-toolbar-tooltip,
                .tf-toolbar-button:focus-visible .tf-toolbar-tooltip {
                    opacity: 1;
                }
                .tf-toolbar-button:hover .tf-toolbar-tooltip-caret,
                .tf-toolbar-button:focus-visible .tf-toolbar-tooltip-caret {
                    opacity: 1;
                }
                .tf-toolbar-button[data-tooltip-placement="top"]:hover
                    .tf-toolbar-tooltip,
                .tf-toolbar-button[data-tooltip-placement="top"]:focus-visible
                    .tf-toolbar-tooltip {
                    transform: translateX(
                            calc(-50% + var(--tt-shift-x, 0px))
                        )
                        translateY(0);
                }
                .tf-toolbar-button[data-tooltip-placement="bottom"]:hover
                    .tf-toolbar-tooltip,
                .tf-toolbar-button[data-tooltip-placement="bottom"]:focus-visible
                    .tf-toolbar-tooltip {
                    transform: translateX(
                            calc(-50% + var(--tt-shift-x, 0px))
                        )
                        translateY(0);
                }
                .tf-toolbar-button[data-tooltip-placement="left"]:hover
                    .tf-toolbar-tooltip,
                .tf-toolbar-button[data-tooltip-placement="left"]:focus-visible
                    .tf-toolbar-tooltip {
                    transform: translateY(
                            calc(-50% + var(--tt-shift-y, 0px))
                        )
                        translateX(0);
                }
                .tf-toolbar-button[data-tooltip-placement="right"]:hover
                    .tf-toolbar-tooltip,
                .tf-toolbar-button[data-tooltip-placement="right"]:focus-visible
                    .tf-toolbar-tooltip {
                    transform: translateY(
                            calc(-50% + var(--tt-shift-y, 0px))
                        )
                        translateX(0);
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
                    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
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
                    .tf-stat { border-left: none; }
                }
                @media (min-width: 520px) {
                    .tf-stat:nth-child(-n + 2) { border-top: none; }
                }
                @media (min-width: 700px) {
                    .tf-stat:nth-child(-n + 3) { border-top: none; }
                }
                @media (min-width: 900px) {
                    .tf-stat:nth-child(-n + 4) { border-top: none; }
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
                    .tf-main-row { grid-template-columns: 1fr !important; }
                }
                @media (max-width: 820px) {
                    .tf-tools-menu {
                        flex-direction: column;
                        width: min(92vw, 360px);
                        align-items: flex-end;
                    }
                    .tf-tools-panel { width: 100% !important; }
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
                    from { opacity: 0; transform: translateY(-6px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>

            {/* Header */}
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
                    <div style={{ flex: "1 1 320px", minWidth: 0 }}>
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

            {/* FIX 2: ordine corretto — editor a sinistra, side panel a destra */}
            <div
                className="tf-main-row"
                style={{
                    gridTemplateColumns: showSidePanel
                        ? "minmax(0, 1fr) 303px"
                        : "minmax(0, 1fr)",
                }}
            >
                {/* Colonna sinistra: editor principale */}
                <div
                    style={{
                        background: "#FFFFFF",
                        border: "1px solid #E5E8EF",
                        borderRadius: 14,
                        padding: 8,
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: 12,
                    }}
                >
                    {/* Toolbar */}
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
                            {/* Pulsanti case + more tools */}
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
                                            capitalizeAfterPunctuation(text),
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

                                {/* FIX 1: menu popover con JSX correttamente bilanciato */}
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
                                            setToolsOpen((prev) => {
                                                const next = !prev
                                                if (next) {
                                                    setActiveSection("none")
                                                }
                                                return next
                                            })
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
                                            {/* Pannello sezioni */}
                                            <div
                                                className="tf-tools-panel"
                                                style={{
                                                    width: "min(320px, 90vw)",
                                                    background: "#FFFFFF",
                                                    border: "1px solid #E5E8EF",
                                                    borderRadius: 12,
                                                    boxShadow:
                                                        "0 12px 30px rgba(0,0,0,0.14)",
                                                    padding: 8,
                                                }}
                                            >
                                                {(
                                                    [
                                                        "transform",
                                                        "lines",
                                                        "cleanup",
                                                        "replace",
                                                    ] as const
                                                ).map((sectionKey) => (
                                                    <button
                                                        key={sectionKey}
                                                        onClick={() =>
                                                            setActiveSection(
                                                                sectionKey
                                                            )
                                                        }
                                                        onMouseEnter={() =>
                                                            setActiveSection(
                                                                sectionKey
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
                                                            padding: "8px 8px",
                                                            display: "flex",
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
                                                                display: "flex",
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
                                                        <ChevronRight
                                                            size={14}
                                                        />
                                                    </button>
                                                ))}
                                            </div>

                                            {/* Pannello gruppi (visibile solo se sezione selezionata) */}
                                            {activeSection !== "none" && (
                                                <div
                                                    className="tf-tools-panel"
                                                    style={{
                                                        width: "min(300px, 90vw)",
                                                        background: "#FFFFFF",
                                                        border: "1px solid #E5E8EF",
                                                        borderRadius: 12,
                                                        boxShadow:
                                                            "0 12px 30px rgba(0,0,0,0.14)",
                                                        padding: 8,
                                                    }}
                                                >
                                                    {(activeSection ===
                                                    "transform"
                                                        ? [
                                                              "reversals",
                                                              "sortings",
                                                          ]
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
                                                            : [
                                                                  "replace",
                                                                  "filter",
                                                              ]
                                                    ).map((groupKey) => (
                                                        <button
                                                            key={groupKey}
                                                            // FIX 3: onClick apre il pannello;
                                                            // onMouseEnter aggiorna solo l'hover
                                                            // senza aprire il side panel.
                                                            onClick={() => {
                                                                setActiveGroup(
                                                                    groupKey
                                                                )
                                                                setToolsOpen(
                                                                    false
                                                                )
                                                            }}
                                                            onMouseEnter={() =>
                                                                setHoveredGroup(
                                                                    groupKey
                                                                )
                                                            }
                                                            onMouseLeave={() =>
                                                                setHoveredGroup(
                                                                    "none"
                                                                )
                                                            }
                                                            className="tf-menu-button"
                                                            data-selected={
                                                                hoveredGroup ===
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
                                                                display: "flex",
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
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Canvas integration */}
                            <div
                                style={{
                                    display: "flex",
                                    gap: 6,
                                    flexWrap: "wrap",
                                    alignItems: "center",
                                    justifyContent: "flex-end",
                                    flex: "0 1 auto",
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: 12,
                                        color: "#5A6472",
                                        marginRight: 4,
                                    }}
                                >
                                    Selection: {selectionInfo.textCount} text
                                </div>
                                <ToolbarButton
                                    label="Import from selection"
                                    icon={<ArrowUpDown size={16} />}
                                    onClick={requestSelectionText}
                                    accent={accent}
                                    variant="icon"
                                    disabled={selectionInfo.textCount === 0}
                                />
                                <ToolbarButton
                                    label="Apply to selection"
                                    icon={<ArrowRight size={16} />}
                                    onClick={applyToSelection}
                                    accent={accent}
                                    variant="icon"
                                    disabled={
                                        selectionInfo.textCount === 0 ||
                                        text.trim().length === 0
                                    }
                                />
                            </div>

                            {/* Undo / Redo / Copy / Clear */}
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

                    {/* Textarea */}
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

                    {/* Stats */}
                    <div
                        className="tf-stats"
                        style={{ margin: "8px -8px -8px" }}
                    >
                        {[
                            { label: "Effective lines", value: effectiveLines },
                            { label: "Visible lines", value: visibleLines },
                            { label: "Words", value: words },
                            { label: "Characters", value: chars },
                        ].map((item) => (
                            <div key={item.label} className="tf-stat">
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
                                        copyStat(item.label, item.value)
                                    }
                                    aria-label={`Copy ${item.label}`}
                                >
                                    <Copy size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Colonna destra: side panel strumenti */}
                {showSidePanel && (
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
                            opacity: 1,
                            transform: "translateX(0)",
                            transition: "opacity 220ms ease, transform 220ms ease",
                        }}
                    >
                        {/* Header pannello */}
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

                        <div className="tf-panel-content">{panelContent}</div>
                    </div>
                )}
            </div>

            {/* Toast */}
            {toast && (
                <div
                    style={{
                        position: "fixed",
                        right: 24,
                        top: 24,
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

const DEFAULT_PROPS: Props = {
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

function App() {
    const [height, setHeight] = React.useState(() =>
        Math.max(640, window.innerHeight)
    )

    React.useEffect(() => {
        const onResize = () => {
            setHeight(Math.max(640, window.innerHeight))
        }
        window.addEventListener("resize", onResize)
        return () => window.removeEventListener("resize", onResize)
    }, [])

    return <TextFormatter {...DEFAULT_PROPS} height={height} />
}

const rootElement = document.getElementById("root")
if (rootElement) {
    const root = createRoot(rootElement)
    root.render(<App />)
}
