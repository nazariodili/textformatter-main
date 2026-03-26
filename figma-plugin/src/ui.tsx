import * as React from "react"
import { createRoot } from "react-dom/client"
import {
    ArrowRight,
    Pilcrow,
    Tag,
    Scissors,
    Search,
    Type,
    Repeat,
    Copy,
    WrapText,
    Baseline,
    Space,
    Replace,
    BarChart3,
} from "lucide-react"

type Props = {
    title: string
    placeholder: string
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

function MenuItem({
    label,
    count = 0,
    selected = false,
    icon,
    onClick,
}: {
    label: string
    count?: number
    selected?: boolean
    icon: React.ReactNode
    onClick: () => void
}) {
    return (
        <button
            type="button"
            className="tf-menu-item"
            data-selected={selected ? "true" : "false"}
            onClick={onClick}
        >
            <span className="tf-menu-icon">{icon}</span>
            <span className="tf-menu-label">{label}</span>
            <span className="tf-menu-count">{count}</span>
        </button>
    )
}

function SmallButton({
    label,
    onClick,
    icon,
}: {
    label: string
    onClick: () => void
    icon?: React.ReactNode
}) {
    return (
        <button type="button" className="tf-button" onClick={onClick}>
            {icon ? <span className="tf-button-icon">{icon}</span> : null}
            <span>{label}</span>
        </button>
    )
}

function InputField({
    icon,
    value,
    onChange,
    placeholder,
    inputMode,
    ariaLabel,
}: {
    icon: React.ReactNode
    value: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"]
    ariaLabel: string
}) {
    return (
        <label className="tf-input">
            <span className="tf-input-icon">{icon}</span>
            <input
                className="tf-input-field"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                inputMode={inputMode}
                aria-label={ariaLabel}
            />
        </label>
    )
}

function OptionRow({
    label,
    actionLabel = "Apply",
    onAction,
}: {
    label: string
    actionLabel?: string
    onAction: () => void
}) {
    return (
        <div className="tf-option-row">
            <span className="tf-option-label">{label}</span>
            <SmallButton label={actionLabel} onClick={onAction} />
        </div>
    )
}

function TextFormatter(props: Props) {
    const {
        title,
        placeholder,
        accent,
        accent2,
        background,
        textColor,
        radius,
        fontSize,
    } = props

    const [text, setText] = React.useState("")
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
    const textRef = React.useRef(text)
    textRef.current = text
    const selectionTextsRef = React.useRef<string[]>([])
    const pendingApplyRef = React.useRef<
        ((incoming: string, incomingTexts: string[]) => void) | null
    >(null)

    const showToast = React.useCallback(() => {}, [])

    // FIX 4: pushHistory e applyText usano ref per leggere sempre il valore
    // corrente di historyIndex senza dipendere dalla closure.
    const pushHistory = React.useCallback((next: string) => {
        const idx = historyIndexRef.current
        const trimmed = historyRef.current.slice(0, idx + 1)
        if (trimmed[trimmed.length - 1] === next) return
        historyRef.current = [...trimmed, next]
        historyIndexRef.current = historyRef.current.length - 1
    }, [])

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
                const incomingTexts = Array.isArray(msg.texts)
                    ? msg.texts.filter(
                          (value: unknown): value is string =>
                              typeof value === "string"
                      )
                    : []
                const active = document.activeElement
                const isTyping =
                    active &&
                    (active.tagName === "INPUT" ||
                        active.tagName === "TEXTAREA")
                if (isTyping) {
                    return
                }
                if (incoming.trim().length > 0) {
                    setText(incoming)
                    pushHistory(incoming)
                    selectionTextsRef.current = incomingTexts
                    if (pendingApplyRef.current) {
                        const applyPending = pendingApplyRef.current
                        pendingApplyRef.current = null
                        applyPending(incoming, incomingTexts)
                    }
                } else {
                    pendingApplyRef.current = null
                    selectionTextsRef.current = []
                }
            }
        }
        window.addEventListener("message", handler)
        return () => window.removeEventListener("message", handler)
    }, [showToast, pushHistory])

    const requestSelectionText = React.useCallback(() => {
        parent.postMessage({ pluginMessage: { type: "getSelectionText" } }, "*")
    }, [])

    React.useEffect(() => {
        requestSelectionText()
    }, [requestSelectionText])

    React.useEffect(() => {
        const refresh = () => {
            parent.postMessage(
                { pluginMessage: { type: "refreshSelection" } },
                "*"
            )
        }
        window.addEventListener("focus", refresh)
        document.addEventListener("visibilitychange", () => {
            if (document.visibilityState === "visible") refresh()
        })
        return () => {
            window.removeEventListener("focus", refresh)
            document.removeEventListener("visibilitychange", refresh)
        }
    }, [])

    // Don't auto-sync on every selection change to avoid interrupting inputs.

    const applyText = React.useCallback(
        (next: string, successMessage?: string) => {
            if (selectionInfo.textCount === 0) return
            setText(next)
            pushHistory(next)
            parent.postMessage(
                { pluginMessage: { type: "applyToSelection", text: next } },
                "*"
            )
            if (successMessage) showToast(successMessage)
            forceUpdate()
        },
        [pushHistory, selectionInfo.textCount, showToast]
    )
    applyTextRef.current = applyText

    const applyTexts = React.useCallback(
        (nextTexts: string[], successMessage?: string) => {
            if (selectionInfo.textCount === 0) return
            setText(nextTexts.join("\n"))
            pushHistory(nextTexts.join("\n"))
            parent.postMessage(
                {
                    pluginMessage: {
                        type: "applyToSelection",
                        texts: nextTexts,
                    },
                },
                "*"
            )
            if (successMessage) showToast(successMessage)
            forceUpdate()
        },
        [pushHistory, selectionInfo.textCount, showToast]
    )

    const applyWithSelection = React.useCallback(
        (transform: (value: string) => string, successMessage?: string) => {
            if (selectionInfo.textCount === 0) return
            const current = textRef.current
            const currentTexts = selectionTextsRef.current
            if (currentTexts.length > 0) {
                applyTexts(
                    currentTexts.map((value) => transform(value)),
                    successMessage
                )
                return
            }
            if (current.trim().length === 0) {
                pendingApplyRef.current = (incoming, incomingTexts) => {
                    if (incomingTexts.length > 0) {
                        applyTexts(
                            incomingTexts.map((value) => transform(value)),
                            successMessage
                        )
                        return
                    }
                    applyText(transform(incoming), successMessage)
                }
                requestSelectionText()
                return
            }
            applyText(transform(current), successMessage)
        },
        [
            applyText,
            applyTexts,
            requestSelectionText,
            selectionInfo.textCount,
            showToast,
        ]
    )

    const copyToClipboard = async (value: string) => {
        try {
            if (navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(value)
                return true
            }
        } catch {
            // fallback below
        }
        const textarea = document.createElement("textarea")
        textarea.value = value
        textarea.style.position = "fixed"
        textarea.style.opacity = "0"
        document.body.appendChild(textarea)
        textarea.focus()
        textarea.select()
        const ok = document.execCommand("copy")
        document.body.removeChild(textarea)
        return ok
    }

    const copyStat = async (label: string, value: number) => {
        await copyToClipboard(String(value))
    }

    const effectiveLines = countEffectiveLines(text)
    const visibleLines = visibleLinesEstimate(text)
    const words = countWords(text)
    const chars = text.length
    type SectionId =
        | "case-punctuation"
        | "reversals"
        | "duplicates"
        | "line-breaks"
        | "create-breaks"
        | "prefix-suffix"
        | "spaces"
        | "find-replace"
        | "stats"

    const [activeSectionId, setActiveSectionId] =
        React.useState<SectionId>("case-punctuation")

    const sections: {
        id: SectionId
        label: string
        count: number
        icon: React.ReactNode
        render: () => React.ReactNode
    }[] = [
        {
            id: "case-punctuation",
            label: "Case & punctuation",
            count: 5,
            icon: <Type size={16} />,
            render: () => (
                <div className="tf-options">
                    <OptionRow
                        label="Capitalize after punctuation"
                        onAction={() =>
                            applyWithSelection(
                                capitalizeAfterPunctuation,
                                "Sentences updated"
                            )
                        }
                    />
                    <OptionRow
                        label="All lowercase"
                        onAction={() =>
                            applyWithSelection(
                                (value) => value.toLowerCase(),
                                "Converted to lowercase"
                            )
                        }
                    />
                    <OptionRow
                        label="Title case"
                        onAction={() =>
                            applyWithSelection(
                                toTitleCase,
                                "Title case applied"
                            )
                        }
                    />
                    <OptionRow
                        label="All uppercase"
                        onAction={() =>
                            applyWithSelection(
                                (value) => value.toUpperCase(),
                                "Converted to uppercase"
                            )
                        }
                    />
                    <OptionRow
                        label="Random case"
                        onAction={() =>
                            applyWithSelection(
                                randomCase,
                                "Random case applied"
                            )
                        }
                    />
                </div>
            ),
        },
        {
            id: "reversals",
            label: "Reversals",
            count: 4,
            icon: <Repeat size={16} />,
            render: () => (
                <div className="tf-options">
                    <OptionRow
                        label="Reverse text"
                        onAction={() =>
                            applyWithSelection(reverseText, "Text reversed")
                        }
                    />
                    <OptionRow
                        label="Reverse words"
                        onAction={() =>
                            applyWithSelection(reverseWords, "Words reversed")
                        }
                    />
                    <OptionRow
                        label="Reverse letters in each word"
                        onAction={() =>
                            applyWithSelection(
                                reverseLettersEachWord,
                                "Letters reversed"
                            )
                        }
                    />
                    <OptionRow
                        label="Reverse line order"
                        onAction={() =>
                            applyWithSelection(
                                reverseLinesOrder,
                                "Line order reversed"
                            )
                        }
                    />
                </div>
            ),
        },
        {
            id: "duplicates",
            label: "Duplicates",
            count: 4,
            icon: <Copy size={16} />,
            render: () => (
                <div className="tf-options">
                    <OptionRow
                        label="Unique words A–Z"
                        onAction={() =>
                            applyWithSelection(
                                uniqueWordsAZ,
                                "Duplicates removed"
                            )
                        }
                    />
                    <OptionRow
                        label="Unique words Z–A"
                        onAction={() =>
                            applyWithSelection(
                                uniqueWordsZA,
                                "Duplicates removed"
                            )
                        }
                    />
                    <OptionRow
                        label="Remove duplicate lines"
                        onAction={() =>
                            applyWithSelection(
                                (value) => removeDuplicateLines(value, false),
                                "Duplicate lines removed"
                            )
                        }
                    />
                    <OptionRow
                        label="Remove duplicate lines (case-sensitive)"
                        onAction={() =>
                            applyWithSelection(
                                (value) => removeDuplicateLines(value, true),
                                "Duplicate lines removed"
                            )
                        }
                    />
                </div>
            ),
        },
        {
            id: "line-breaks",
            label: "Line breaks",
            count: 4,
            icon: <WrapText size={16} />,
            render: () => (
                <div className="tf-options">
                    <InputField
                        ariaLabel="Replace line breaks with"
                        icon={<Pilcrow size={16} />}
                        value={replaceBreaksWith}
                        onChange={(e) => setReplaceBreaksWith(e.target.value)}
                        placeholder="Replace line breaks with..."
                    />
                    <OptionRow
                        label="Replace all line breaks"
                        onAction={() =>
                            applyWithSelection(
                                (value) =>
                                    replaceLineBreaks(
                                        value,
                                        replaceBreaksWith
                                    ),
                                "Line breaks replaced"
                            )
                        }
                    />
                    <OptionRow
                        label="Remove all line breaks"
                        onAction={() =>
                            applyWithSelection(
                                removeAllLineBreaks,
                                "Line breaks removed"
                            )
                        }
                    />
                    <OptionRow
                        label="Remove empty lines"
                        onAction={() =>
                            applyWithSelection(
                                removeEmptyLines,
                                "Empty lines removed"
                            )
                        }
                    />
                    <OptionRow
                        label="Reduce multiple empty lines"
                        onAction={() =>
                            applyWithSelection(
                                reduceMultipleEmptyLines,
                                "Empty lines reduced"
                            )
                        }
                    />
                </div>
            ),
        },
        {
            id: "create-breaks",
            label: "Create line breaks",
            count: 1,
            icon: <Scissors size={16} />,
            render: () => (
                <div className="tf-options">
                    <InputField
                        ariaLabel="Break every N characters"
                        icon={<Scissors size={16} />}
                        value={everyChars}
                        onChange={(e) => setEveryChars(e.target.value)}
                        inputMode="numeric"
                        placeholder="Break every N characters..."
                    />
                    <OptionRow
                        label="Add breaks every N chars"
                        onAction={() =>
                            applyWithSelection(
                                (value) =>
                                    createBreakEveryNChars(
                                        value,
                                        Number(everyChars)
                                    ),
                                "Breaks created"
                            )
                        }
                    />
                </div>
            ),
        },
        {
            id: "prefix-suffix",
            label: "Prefix & suffix",
            count: 1,
            icon: <Tag size={16} />,
            render: () => (
                <div className="tf-options">
                    <InputField
                        ariaLabel="Prefix"
                        icon={<Tag size={16} />}
                        value={prefix}
                        onChange={(e) => setPrefix(e.target.value)}
                        placeholder="Prefix..."
                    />
                    <InputField
                        ariaLabel="Suffix"
                        icon={<Tag size={16} />}
                        value={suffix}
                        onChange={(e) => setSuffix(e.target.value)}
                        placeholder="Suffix..."
                    />
                    <OptionRow
                        label="Apply prefix and suffix"
                        onAction={() =>
                            applyWithSelection(
                                (value) =>
                                    addPrefixSuffixToLines(
                                        value,
                                        prefix,
                                        suffix
                                    ),
                                "Prefix and suffix applied"
                            )
                        }
                    />
                </div>
            ),
        },
        {
            id: "spaces",
            label: "Spaces",
            count: 2,
            icon: <Space size={16} />,
            render: () => (
                <div className="tf-options">
                    <OptionRow
                        label="Remove double spaces (once)"
                        onAction={() =>
                            applyWithSelection(
                                removeDoubleSpacesOnce,
                                "Double spaces reduced"
                            )
                        }
                    />
                    <OptionRow
                        label="Remove double spaces (all)"
                        onAction={() =>
                            applyWithSelection(
                                removeDoubleSpacesAll,
                                "Double spaces removed"
                            )
                        }
                    />
                </div>
            ),
        },
        {
            id: "find-replace",
            label: "Find & replace",
            count: 1,
            icon: <Replace size={16} />,
            render: () => (
                <div className="tf-options">
                    <InputField
                        ariaLabel="Find"
                        icon={<Search size={16} />}
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Find..."
                    />
                    <InputField
                        ariaLabel="Replace with"
                        icon={<ArrowRight size={16} />}
                        value={replaceValue}
                        onChange={(e) => setReplaceValue(e.target.value)}
                        placeholder="Replace with..."
                    />
                    <div className="tf-panel-footer">
                        <SmallButton
                            label="Replace"
                            onClick={() =>
                                applyWithSelection(
                                    (value) =>
                                        replaceTextAll(
                                            value,
                                            searchValue,
                                            replaceValue
                                        ),
                                    "Replacement completed"
                                )
                            }
                        />
                    </div>
                </div>
            ),
        },
        {
            id: "stats",
            label: "Stats",
            count: 4,
            icon: <BarChart3 size={16} />,
            render: () => (
                <div className="tf-options">
                    {[
                        { label: "Effective lines", value: effectiveLines },
                        { label: "Visible lines", value: visibleLines },
                        { label: "Words", value: words },
                        { label: "Characters", value: chars },
                    ].map((item) => (
                        <div key={item.label} className="tf-stat-row">
                            <span className="tf-stat-label">
                                {item.label}
                            </span>
                            <span className="tf-stat-value">
                                {item.value}
                            </span>
                            <SmallButton
                                label="Copy"
                                onClick={() =>
                                    copyStat(item.label, item.value)
                                }
                            />
                        </div>
                    ))}
                </div>
            ),
        },
    ]

    const activeSection =
        sections.find((section) => section.id === activeSectionId) ??
        sections[0]

    const shellRef = React.useRef<HTMLDivElement | null>(null)

    React.useLayoutEffect(() => {
        const element = shellRef.current
        if (!element) return
        let frame = 0
        const postSize = () => {
            if (frame) cancelAnimationFrame(frame)
            frame = requestAnimationFrame(() => {
                const rect = element.getBoundingClientRect()
                const height = Math.max(100, Math.ceil(rect.height))
                parent.postMessage(
                    { pluginMessage: { type: "resize", height } },
                    "*"
                )
            })
        }
        const observer = new ResizeObserver(postSize)
        observer.observe(element)
        postSize()
        return () => {
            if (frame) cancelAnimationFrame(frame)
            observer.disconnect()
        }
    }, [])

    return (
        <div
            className="tf-shell"
            style={{
                width: "100%",
                boxSizing: "border-box",
                background: "#FFFFFF",
                color: textColor,
                fontFamily:
                    '"Inter", "SF Pro Text", "SF Pro Display", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                position: "relative",
            }}
            ref={shellRef}
        >
            <style>{`
                .tf-shell {
                    display: flex;
                    flex-direction: column;
                    align-items: stretch;
                    font-size: 11px;
                    line-height: 1.2;
                }
                .tf-shell * {
                    box-sizing: border-box;
                }
                .tf-shell button,
                .tf-shell input {
                    font-family: inherit;
                }
                .tf-main-row {
                    display: flex;
                    align-items: stretch;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                }
                .tf-sidebar {
                    width: 200px;
                    border-right: 1px solid rgba(0, 0, 0, 0.1);
                    padding: 8px;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    background: #fff;
                }
                .tf-menu-item {
                    width: 100%;
                    height: 24px;
                    padding: 0 8px;
                    border-radius: 5px;
                    border: 1px solid transparent;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    cursor: pointer;
                    background: transparent;
                    color: rgba(0, 0, 0, 0.5);
                    font-weight: 500;
                    font-size: 11px;
                    text-align: left;
                }
                .tf-menu-item[data-selected="true"] {
                    background: #f5f5f5;
                    color: rgba(0, 0, 0, 0.9);
                    font-weight: 600;
                }
                .tf-menu-item:hover {
                    background: #f5f5f5;
                }
                .tf-menu-item[data-selected="true"] .tf-menu-icon {
                    color: rgba(0, 0, 0, 0.9);
                }
                .tf-menu-item:focus-visible {
                    outline: 2px solid rgba(0, 0, 0, 0.12);
                    outline-offset: 2px;
                }
                .tf-menu-label {
                    flex: 1 1 auto;
                    min-width: 0;
                }
                .tf-menu-icon {
                    width: 16px;
                    height: 16px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    color: rgba(0, 0, 0, 0.7);
                }
                .tf-menu-count {
                    flex: 0 0 auto;
                }
                .tf-panel {
                    flex: 0 0 280px;
                    width: 280px;
                    min-width: 0;
                    padding: 8px;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    background: #fff;
                }
                .tf-panel-content {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                .tf-credits-bar {
                    padding: 8px 16px;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    background: #fff;
                    font-size: 11px;
                    font-weight: 500;
                    color: rgba(0, 0, 0, 0.5);
                }
                .tf-credits-label {
                    color: rgba(0, 0, 0, 0.5);
                }
                .tf-credits-link {
                    color: #007be5;
                    text-decoration: underline;
                    text-decoration-skip-ink: none;
                    margin-left: 4px;
                }
                .tf-options {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                .tf-option-row {
                    height: 24px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 0 8px;
                    border-radius: 5px;
                    background: transparent;
                }
                .tf-option-label {
                    flex: 1 1 auto;
                    min-width: 0;
                    color: rgba(0, 0, 0, 0.9);
                }
                .tf-button {
                    height: 24px;
                    padding: 0 8px;
                    border-radius: 5px;
                    border: 1px solid rgba(0, 0, 0, 0.1);
                    background: #ffffff;
                    color: rgba(0, 0, 0, 0.9);
                    font-size: 11px;
                    font-weight: 500;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    gap: 4px;
                    white-space: nowrap;
                }
                .tf-button:hover {
                    background: #f5f5f5;
                }
                .tf-button:focus-visible {
                    outline: 2px solid rgba(0, 0, 0, 0.12);
                    outline-offset: 2px;
                }
                .tf-input {
                    height: 24px;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    padding: 0 8px;
                    border-radius: 5px;
                    background: rgba(0, 0, 0, 0.03);
                    overflow: hidden;
                }
                .tf-input-icon {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 16px;
                    height: 16px;
                    color: rgba(0, 0, 0, 0.6);
                }
                .tf-input-field {
                    border: none;
                    outline: none;
                    background: transparent;
                    flex: 1 1 auto;
                    min-width: 0;
                    font-size: 11px;
                    font-weight: 500;
                    color: rgba(27, 36, 55, 0.9);
                }
                .tf-input-field::placeholder {
                    color: rgba(27, 36, 55, 0.5);
                }
                .tf-panel-footer {
                    display: flex;
                    justify-content: flex-end;
                }
                .tf-stat-row {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 0 8px;
                    height: 24px;
                    border-radius: 5px;
                }
                .tf-stat-label {
                    flex: 1 1 auto;
                    color: rgba(0, 0, 0, 0.7);
                }
                .tf-stat-value {
                    font-weight: 600;
                }
            `}</style>

            <div className="tf-main-row">
                <div className="tf-sidebar">
                    {sections.map((section) => (
                        <MenuItem
                            key={section.id}
                            label={section.label}
                            count={section.count}
                            icon={section.icon}
                            selected={section.id === activeSectionId}
                            onClick={() => setActiveSectionId(section.id)}
                        />
                    ))}
                </div>
                <div className="tf-panel">
                    <div className="tf-panel-content">
                        {activeSection.render()}
                    </div>
                </div>
            </div>
            <div className="tf-credits-bar">
                <span className="tf-credits-label">Created by</span>
                <a
                    className="tf-credits-link"
                    href="https://www.nazariodiliberto.com"
                    target="_blank"
                    rel="noreferrer"
                >
                    Nazario Di Liberto
                </a>
            </div>

        </div>
    )
}

const DEFAULT_PROPS: Props = {
    title: "Text Formatter",
    placeholder: "Paste or type your text here…",
    accent: "#1B2437",
    accent2: "#C63D2F",
    background: "#F6F6F7",
    textColor: "#1B2437",
    radius: 24,
    fontSize: 15,
}

;(window as any).__tf_booted = true

class ErrorBoundary extends React.Component<
    { children: React.ReactNode },
    { hasError: boolean; message: string }
> {
    state = { hasError: false, message: "" }

    static getDerivedStateFromError(error: unknown) {
        return {
            hasError: true,
            message: error instanceof Error ? error.message : String(error),
        }
    }

    componentDidCatch(error: unknown) {
        console.error("Text Formatter UI error:", error)
    }

    render() {
        if (this.state.hasError) {
            return (
                <div
                    style={{
                        padding: 16,
                        fontSize: 14,
                        color: "#1B2437",
                    }}
                >
                    <strong>Errore UI.</strong>
                    <div style={{ marginTop: 8, color: "#5A6472" }}>
                        Apri la Console del plugin per i dettagli.
                    </div>
                    <div style={{ marginTop: 8, color: "#5A6472" }}>
                        {this.state.message}
                    </div>
                </div>
            )
        }
        return this.props.children
    }
}

function App() {
    return (
        <ErrorBoundary>
            <TextFormatter {...DEFAULT_PROPS} />
        </ErrorBoundary>
    )
}

const rootElement = document.getElementById("root")
if (rootElement) {
    const root = createRoot(rootElement)
    root.render(<App />)
}
