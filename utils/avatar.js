const avatarColors = {
    male: {
        background: "#dbeafe",
        shirt: "#2563eb",
        hair: "#1f2937",
    },
    female: {
        background: "#fce7f3",
        shirt: "#db2777",
        hair: "#7c2d12",
    },
};

const getInitials = (name = "User") => {
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() || "")
        .join("") || "U";
};

const createAvatar = ({ fullName, gender }) => {
    const colors = avatarColors[gender] || avatarColors.male;
    const initials = getInitials(fullName);
    const hairPath = gender === "female"
        ? '<path d="M37 42c0-18 12-30 27-30s27 12 27 30v22H37V42z" fill="' + colors.hair + '"/>'
        : '<path d="M36 36c5-15 19-24 35-20 11 3 18 11 21 22-14-7-31-8-56-2z" fill="' + colors.hair + '"/>';

    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
            <rect width="128" height="128" rx="64" fill="${colors.background}"/>
            ${hairPath}
            <circle cx="64" cy="54" r="28" fill="#f8c7a4"/>
            <circle cx="53" cy="53" r="4" fill="#111827"/>
            <circle cx="75" cy="53" r="4" fill="#111827"/>
            <path d="M54 69c6 6 14 6 20 0" fill="none" stroke="#111827" stroke-width="4" stroke-linecap="round"/>
            <path d="M26 128c5-25 20-38 38-38s33 13 38 38H26z" fill="${colors.shirt}"/>
            <text x="64" y="114" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" font-weight="700" fill="#ffffff">${initials}</text>
        </svg>
    `.replace(/\s+/g, " ").trim();

    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

module.exports = createAvatar;
