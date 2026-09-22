// Same one-memory Hebbian network as the validated prototype. No learned classifier here.
export const memory = ['0111110','1000001','0000001','0000110','0011000','0100000','1111111'].join('').split('').map(v=>v==='1'?1:-1);
export const damagedIndexes = [2,8,13,18,25,31,38,43];
const weights = memory.map((a,i)=>memory.map((b,j)=>i===j?0:a*b/memory.length));
export function energy(state) {
  return -.5 * state.reduce((sum,a,i)=>sum + a * weights[i].reduce((field,w,j)=>field+w*state[j],0),0);
}
export function damage(count=8) {
  const flipped = new Set(damagedIndexes);
  if (count > flipped.size) {
    // Ruído equilibrado: furos extras apenas onde o contorno é redundante
    // (topo/fundo) e pontinhos espalhados pelo fundo. Preserva a densidade
    // de pixels acesos (~20) para o padrão continuar reconhecível —
    // ruído só no fundo escurecia a grade e apagava o desenho.
    const extraHoles = [4, 44, 46];
    const extraStrays = [10, 16, 22, 33, 39];
    extraHoles.concat(extraStrays)
      .slice(0, count - flipped.size)
      .forEach(i => flipped.add(i));
  }
  return memory.map((v,i)=>flipped.has(i)?-v:v);
}
export function recover(input) {
  if(input.length!==49 || input.some(v=>v!==1&&v!==-1)) throw new Error('Expected 49 bipolar pixels');
  const state=[...input];
  const frames=[{state:[...state],energy:energy(state),changed:-1}];
  for(let sweep=0;sweep<100;sweep++) {
    let changes=0;
    for(let i=0;i<state.length;i++) {
      const field=weights[i].reduce((sum,w,j)=>sum+w*state[j],0);
      const next=field===0?state[i]:field>0?1:-1;
      if(next!==state[i]) {
        state[i]=next; changes++;
        frames.push({state:[...state],energy:energy(state),changed:i});
      }
    }
    if(changes===0) return frames;
  }
  throw new Error('Network did not settle within the safety bound');
}
