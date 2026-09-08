import React from 'react';

const FlowDefs = ({ id }) => (
    <defs>
        <marker id={`arrow-${id}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" className="project-art-arrowhead" />
        </marker>
        <filter id={`glow-${id}`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
    </defs>
);

const MrtbArtwork = () => (
    <svg viewBox="0 0 760 520" className="project-art-svg" role="img" aria-labelledby="mrtb-art-title mrtb-art-desc">
        <title id="mrtb-art-title">MRTB operations system map</title>
        <desc id="mrtb-art-desc">Requests, documents, attendance and procurement converge into a secure workflow engine, then move to approvals and an audit trail.</desc>
        <FlowDefs id="mrtb" />

        <g className="project-art-ghost" aria-hidden="true">
            <circle cx="370" cy="260" r="196" />
            <circle cx="370" cy="260" r="154" strokeDasharray="3 12" />
            <path d="M370 34V486M144 260H596" />
        </g>

        <g className="project-art-flow" markerEnd="url(#arrow-mrtb)">
            <path d="M92 96 C210 96 218 198 294 226" />
            <path d="M72 202 C188 202 218 232 286 249" />
            <path d="M72 316 C192 316 224 286 286 268" />
            <path d="M92 424 C210 424 218 324 294 294" />
            <path d="M447 230 C520 199 551 142 661 142" />
            <path d="M454 260 C552 260 579 260 684 260" />
            <path d="M447 292 C520 322 551 378 661 378" />
        </g>

        <g className="project-art-node-group">
            <circle cx="78" cy="96" r="8" /><text x="102" y="101">REQUESTS</text>
            <circle cx="58" cy="202" r="8" /><text x="82" y="207">DOCUMENTS</text>
            <circle cx="58" cy="316" r="8" /><text x="82" y="321">ATTENDANCE</text>
            <circle cx="78" cy="424" r="8" /><text x="102" y="429">PROCUREMENT</text>
        </g>

        <g className="project-art-core" filter="url(#glow-mrtb)">
            <circle cx="370" cy="260" r="88" />
            <circle cx="370" cy="260" r="62" />
            <text x="370" y="250" textAnchor="middle" className="project-art-monogram">MRTB</text>
            <text x="370" y="278" textAnchor="middle" className="project-art-core-label">WORKFLOW ENGINE</text>
        </g>

        <g className="project-art-output">
            <circle cx="674" cy="142" r="7" /><text x="648" y="119" textAnchor="end">APPROVAL</text>
            <circle cx="697" cy="260" r="7" /><text x="680" y="241" textAnchor="end">ROLE ACCESS</text>
            <circle cx="674" cy="378" r="7" /><text x="648" y="414" textAnchor="end">AUDIT TRAIL</text>
        </g>

        <text x="28" y="498" className="project-art-caption">ONE OPERATIONAL SOURCE OF TRUTH</text>
    </svg>
);

const ClassifyArtwork = () => {
    const studentDots = [
        [72, 104], [126, 90], [180, 116], [64, 176], [123, 168], [188, 188],
        [78, 250], [140, 246], [198, 270], [62, 332], [126, 324], [184, 350],
    ];

    return (
        <svg viewBox="0 0 760 520" className="project-art-svg" role="img" aria-labelledby="classify-art-title classify-art-desc">
            <title id="classify-art-title">ClassiFy attendance intelligence map</title>
            <desc id="classify-art-desc">Classroom presence signals enter an attendance intelligence core that synchronizes web and mobile tools and flags attendance risk.</desc>
            <FlowDefs id="classify" />

            <g className="project-art-students" aria-hidden="true">
                {studentDots.map(([cx, cy], index) => <circle cx={cx} cy={cy} r={index % 3 === 0 ? 7 : 4} key={`${cx}-${cy}`} />)}
                <path d="M44 402 C101 365 154 390 219 344" />
                <text x="44" y="435">CLASSROOM SIGNALS</text>
            </g>

            <g className="project-art-flow" markerEnd="url(#arrow-classify)">
                <path d="M93 104 C222 100 232 186 298 221" />
                <path d="M141 246 C232 246 253 250 286 252" />
                <path d="M82 332 C207 339 236 303 294 281" />
                <path d="M451 224 C530 183 563 129 663 111" />
                <path d="M458 260 C553 260 594 260 690 260" />
                <path d="M451 296 C530 337 563 391 663 409" />
            </g>

            <g className="project-art-ghost" aria-hidden="true">
                <circle cx="370" cy="260" r="152" strokeDasharray="2 10" />
                <path d="M370 56 A204 204 0 0 1 574 260" />
                <path d="M370 464 A204 204 0 0 1 166 260" />
            </g>

            <g className="project-art-core" filter="url(#glow-classify)">
                <circle cx="370" cy="260" r="96" />
                <path d="M326 258 C337 219 403 207 421 250 C436 287 405 322 367 315 C332 309 313 284 326 258Z" />
                <circle cx="348" cy="255" r="5" /><circle cx="391" cy="239" r="5" /><circle cx="384" cy="286" r="5" />
                <path d="M348 255L391 239L384 286L348 255" />
                <text x="370" y="356" textAnchor="middle" className="project-art-core-label">ATTENDANCE INTELLIGENCE</text>
            </g>

            <g className="project-art-output">
                <circle cx="676" cy="108" r="7" /><text x="654" y="84" textAnchor="end">WEB CONSOLE</text>
                <circle cx="703" cy="260" r="7" /><text x="681" y="238" textAnchor="end">MOBILE SYNC</text>
                <circle cx="676" cy="412" r="7" /><text x="654" y="448" textAnchor="end">RISK SIGNAL</text>
            </g>

            <text x="28" y="498" className="project-art-caption">PRESENCE → SESSION → INSIGHT</text>
        </svg>
    );
};

const ExamflowArtwork = () => (
    <svg viewBox="0 0 760 520" className="project-art-svg" role="img" aria-labelledby="examflow-art-title examflow-art-desc">
        <title id="examflow-art-title">ExamFlow AI assessment workflow</title>
        <desc id="examflow-art-desc">An examination moves from authoring through AI assistance and human review to grading, with security and an audit record throughout.</desc>
        <FlowDefs id="examflow" />

        <g className="project-art-ghost" aria-hidden="true">
            <path d="M55 260 C154 92 273 432 380 260 S606 91 706 260" />
            <path d="M55 260 C154 428 273 90 380 260 S606 430 706 260" />
            <circle cx="380" cy="260" r="202" strokeDasharray="2 14" />
        </g>

        <g className="project-art-flow project-art-flow--exam" markerEnd="url(#arrow-examflow)">
            <path d="M76 260 C180 144 261 373 368 260 S559 145 680 260" />
        </g>

        <g className="project-art-checkpoints">
            <circle cx="92" cy="244" r="22" /><text x="92" y="250" textAnchor="middle">01</text>
            <text x="92" y="210" textAnchor="middle">AUTHOR</text>

            <circle cx="286" cy="316" r="30" /><text x="286" y="322" textAnchor="middle">02</text>
            <text x="286" y="365" textAnchor="middle">AI ASSIST</text>

            <circle cx="474" cy="195" r="26" /><text x="474" y="201" textAnchor="middle">03</text>
            <text x="474" y="156" textAnchor="middle">HUMAN REVIEW</text>

            <circle cx="670" cy="260" r="22" /><text x="670" y="266" textAnchor="middle">04</text>
            <text x="670" y="307" textAnchor="middle">GRADE</text>
        </g>

        <g className="project-art-paper" aria-hidden="true">
            <path d="M55 70 H235 M55 91 H198 M55 112 H218" />
            <circle cx="240" cy="70" r="3" /><circle cx="207" cy="91" r="3" /><circle cx="227" cy="112" r="3" />
        </g>

        <g className="project-art-audit" aria-hidden="true">
            <path d="M523 410 H706 M551 431 H706 M580 452 H706" />
            <text x="515" y="455" textAnchor="end">SECURE AUDIT</text>
        </g>

        <text x="28" y="498" className="project-art-caption">AI ASSISTS • EDUCATORS DECIDE</text>
    </svg>
);

const ProjectArtwork = ({ project }) => {
    if (project.id === 'classify') return <ClassifyArtwork />;
    if (project.id === 'examflow') return <ExamflowArtwork />;
    return <MrtbArtwork />;
};

export default ProjectArtwork;
