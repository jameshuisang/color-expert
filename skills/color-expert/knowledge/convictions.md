# Color specialist: working convictions

This guide prioritizes judgment grounded in fundamentals, not a pile of references. These are our working defaults: take a position, explain why, and identify when to choose differently. They are not the reader’s personal aesthetic preferences.

Color Nerd remains the primary learning source. Historical practice and scientific/technical evidence qualify the synthesis. A repeatable process can improve decisions; no formula guarantees beauty.

These recommendations are project synthesis; a source does not endorse every cross-media example.

## relational: Design relationships, not a row of attractive swatches.

**Basis:** perceptual-foundation + studio-method.
**Do:** Judge every important color against its actual neighbors, at the size and amount it will occupy.
**When / exception:** A swatch is a useful starting sample, not a final composition.
**Example:** For a poster, compare the same coral title on cream and dark blue; keep the lettering size fixed so the background is the variable. For UI, review the accent inside the real button and surrounding surface.
**Tradeoff:** This can require separate tokens in light and dark themes rather than preserving one brand hex everywhere.
**Test:** Compare two contextual mockups; ask which element is read first and whether the intended relationship survives.
**Evidence IDs:** albers-context, color-fidget-lessons.

## structure: Establish light–dark structure before multiplying hues.

**Basis:** studio-heuristic.
**Do:** When hierarchy is unclear, separate the focal element, supporting planes and ground in lightness before adding another hue.
**When / exception:** Use especially for small type, dense interfaces and representational subjects. Equal-lightness vibration can be intentional in expressive work.
**Example:** Try an ink-dark headline, middle-value illustration and pale ground. Keep those roles while auditioning teal versus rust. A grayscale view is a diagnostic, not the final aesthetic judge.
**Tradeoff:** Flattening everything into maximum contrast can destroy atmospheric depth or quietness. Protect essential reading, not every decorative edge.
**Test:** Inspect thumbnail and grayscale structure, then return to color; measure required text pairs separately.
**Evidence IDs:** dow-composition, wcag-text.

## emphasis: Spend vividness and contrast where attention belongs.

**Basis:** studio-heuristic.
**Do:** Decide what should dominate; reduce competing chroma, area or contrast elsewhere before making the focal color louder.
**When / exception:** A small vivid accent is a reliable starting option, not a universal rule. A vivid field can frame a quieter focal object.
**Example:** In an illustration, hold distant foliage in lower chroma and reserve vivid orange for a subject. In a dense tool, keep ordinary panels restrained and use a clear action accent.
**Tradeoff:** Equal high intensity can serve a deliberately exuberant or confrontational poster; use scale and placement to retain hierarchy.
**Test:** Ask whether two equally emphatic elements are meant to compete. If not, alter one variable and compare.
**Evidence IDs:** color-fidget-lessons, dow-composition.

## coherence: Create a shared constraint, then choose deliberate variation.

**Basis:** studio-heuristic.
**Do:** Begin with a limited hue family, common character or repeated accent. Add a color only when it performs a distinct job.
**When / exception:** The constraint can be hue, chroma, value or role; it need not be a fixed number of colors.
**Example:** A warm paper ground, dark brown lettering and one blue accent share restrained supporting tones while allowing a cool focal interruption. An analogous green scene can vary lightness widely without adding a complementary red.
**Tradeoff:** Too much sameness loses distinctions; a cohesive palette is not necessarily the most exciting or best-liked one.
**Test:** State what unifies the palette and what intentionally breaks that pattern. Remove one color and see whether a useful distinction is lost.
**Evidence IDs:** color-fidget-lessons, pair-research, character-harmony.

## roles: A palette needs roles, proportions and placement.

**Basis:** studio-heuristic + interface-contract.
**Do:** Define ground, support, focal and semantic roles before delivering tokens. Show their relative use, not just equal swatches.
**When / exception:** 60–30–10 may help an initial study; never enforce its percentages as correctness.
**Example:** A poster can use a dominant orange field and quiet cream title; the same colors may reverse roles in a reading app. Error and success colors in software must retain meaning across screens.
**Tradeoff:** A high-chroma field may fit expressive work yet make long reading or dense status displays harder to organize.
**Test:** Review the palette applied to a representative composition and, for UI, include default, hover, focus, error and disabled situations as relevant.
**Evidence IDs:** color-fidget-lessons, confident-color.

## medium: Carry the intention across media, not an unexamined color recipe.

**Basis:** technical-constraint.
**Do:** State medium and color model. Proof the actual output before claiming a match or mixture.
**When / exception:** Perceptual spacing, display interpolation and pigment mixing answer different questions.
**Example:** Translate a screen palette into an acrylic study with measured test swatches, not an RGB average. A wide-gamut accent needs an evaluated sRGB alternative; print needs a proof on the intended stock.
**Tradeoff:** A lower-chroma reproduction may preserve hierarchy better than chasing an impossible saturated match.
**Test:** Record the color space for digital values and pigments/support/lighting for physical studies. Distinguish proposed from physically verified results.
**Evidence IDs:** color-models, golden-mixing, appearance-models, hue-planes.

## meaning: Use color to express an intention; test the interpretation.

**Basis:** empirical-boundary + studio-method.
**Do:** Name the desired character and audience, choose a defensible direction, then test it in context.
**When / exception:** Do not equate harmonious, beautiful, noticeable and appropriate. They are different goals.
**Example:** For a calm brand, begin with restrained chroma and a clear value range; compare with a more vivid version before deciding. Do not claim that blue automatically produces trust.
**Tradeoff:** A deliberately dissonant scheme may be the stronger expressive choice; calm is not always better.
**Test:** Ask whether it communicates the brief and which version the intended audience prefers. Report the rationale as judgment, not scientific certainty.
**Evidence IDs:** pair-research, color-fidget-lessons.

## function: Never purchase visual elegance by making meaning inaccessible.

**Basis:** accessibility-constraint.
**Do:** Keep essential text and functional distinctions usable; improve decorative freedom around that constraint.
**When / exception:** Measured WCAG text contrast is one check, not complete accessibility or a beauty score.
**Example:** Use a pale brand color as a surface with dark text rather than forcing pale text on white. Pair error color with a message or symbol.
**Tradeoff:** An artist may intentionally hide a form; an interface must not hide information users need.
**Test:** Run the provided checker on opaque sRGB pairs; require rendered analysis for transparency/images and non-color cues for meaningful states.
**Evidence IDs:** wcag-text, use-of-color.

## Working method

1. Name the purpose, medium and main thing the viewer should notice.
2. Choose a light–dark structure and one unifying constraint.
3. Assign color roles and intentional emphasis; propose actual tokens or material targets.
4. Show one strong recommendation and one meaningful alternative, not ten arbitrary palettes.
5. Apply them to a representative composition. Change one major variable at a time.
6. Check practical constraints; state what was measured, what was visually reviewed and what remains a proposal.

Do not answer with a source list instead of a decision. For a narrow numerical audit, skip this creative process and run the check. For a broad aesthetic request, consult this document first, then only the relevant evidence.

## New decision refinements

- A hue harmony label does not settle lightness, chroma or area. Rotating hues need not preserve their achievable vividness or visual contrast. Load `hue-plane` for model/gamut questions.
- Unequal hue intervals, chroma and area are useful exploration exercises, not compulsory conditions of beauty. Equal distributions can serve intentional repetition, equality or tension. Load `palette-exploration` when developing alternatives.
- Ordered data requires the right map semantics before stylistic choices: sequential, diverging, cyclic and categorical are not interchangeable. Load `data-ramp`, run its narrow sample-order check where applicable, then inspect the actual visualization.
