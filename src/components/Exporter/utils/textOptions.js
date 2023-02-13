
import { css } from 'sharedUtils/blockStyling'
import getStylingSamples from './getStylingSamples'


const pg = (f,i) => mute(`// ${f?`File. `:``}Page ${i}`)
const locale = (i) => mute(`// ${i>0?`Locale ${i}`:`Original locale`}`)
const h = (md) => md ? `<b>### Headline</b>` : `Headline`
const p = (i) => `Paragraph ${i}`
const mute = (c) => `<span>${c}</span>`
const t = mute(`...`)


// Stylized paragraphs, including CSS.
const styledPs = (md) => getStylingSamples({ext:md?'md':'txt'}) + (md ? css(true) : ``)

// Basic set: title and 2 paragraphs
const bps = (md) => `\n${p(1)}\n\n${p(2)}`

// Second page
const bps2 = (f) => `\n\n${pg(f,2)}\n${t}`


export default {


'0-0-0':(md)=>
`${pg(true,1)}
${bps(md)}

${t}
${bps2(true)}`,



'1-0-0':(md)=>
`${pg(true,1)}

${locale(1)}
${bps(md)}

${t}

${locale(2)}
${t}
${bps2(true)}`,



'0-1-0':(md)=>
`${pg(true,1)}
${bps(md)}

${styledPs(md)}

${t}
${bps2(true)}`,



'0-0-1':(md)=>
`${pg(false,1)}
${bps(md)}

${t}


${pg(false,2)}
${t}`,



'1-1-0':(md)=>
`${pg(true,1)}

${locale(1)}
${bps(md)}

${styledPs(md)}

${t}

${locale(2)}
${t}

${pg(true,2)}
${t}`,



'0-1-1':(md)=>
`${pg(false,1)}
${bps(md)}

${styledPs(md)}

${t}
${bps2(false)}`,



'1-0-1':(md)=>
`${pg(false,1)}

${locale(1)}
${bps(md)}

${t}

${locale(2)}
${t}

${pg(false,2)}
${t}`,



'1-1-1':(md)=>
`${pg(false,1)}

${locale(1)}
${bps(md)}

${styledPs(md)}${t}

${locale(2)}
${t}

${pg(false,2)}
${t}`,


}