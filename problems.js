/* ============================================================
   ★ 교수님 설정 구역 ★
============================================================ */
const SHEETS_URL  = 'https://script.google.com/macros/s/AKfycbwHaOaYbjhbwDK6wggzPdSBZ5uH_kJKEwYisR26I9Y7r21ra8Z_D8cvYXOJgegy_qDd/exec';          // Google Sheets web app URL
const SHEETS_KEY  = 'h0vBgzOeEvfvK0WQYqXdDw';  // auth key for admin/ratings mode
const COURSE_NAME = 'C Programming (1)';

// Notice (empty string = hidden)
const NOTICE = '2026-1 C Programming (1) 종료로 테스트 실행 및 제출 불가입니다.';

// Admin emails (admin panel shown on login with these accounts)
const ADMIN_EMAILS = ['khwon.public@gmail.com'];
const TA_EMAILS    = ['ghkdwndhr227@inu.ac.kr'];

/* ── Random test case generator ── */
function ri(min,max){ return Math.floor(Math.random()*(max-min+1))+min; }
function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

const GEN = {
  hw1: ()=>{ const a=ri(1,9),b=ri(1,9); return {input:`${a} ${b}`,expected:`${a+b}`}; },

  hw2: ()=>{ const a=ri(-1000,1000),b=ri(-1000,1000),c=ri(-1000,1000);
    return {input:`${a} ${b} ${c}`,expected:`${Math.min(a,b,c)}`}; },

  hw3: ()=>{ const n=ri(0,12); let f=1; for(let i=2;i<=n;i++)f*=i;
    return {input:`${n}`,expected:`${f}`}; },

  p1: (slot)=>{
    const ops=['+','-','*','/'];
    const op=ops[slot-1]; // slot1=+, slot2=-, slot3=*, slot4=/
    const a=ri(1,20), b=(op==='/' && ri(1,3)===1) ? 0 : ri(1,10);
    let exp;
    if(op==='+') exp=(a+b).toFixed(2);
    else if(op==='-') exp=(a-b).toFixed(2);
    else if(op==='*') exp=(a*b).toFixed(2);
    else exp=b===0?'Error: division by zero':(a/b).toFixed(2);
    return {input:`${a} ${op} ${b}`,expected:exp};
  },

  p2: (slot)=>{
    const map={1:'Winter',2:'Winter',3:'Spring',4:'Spring',5:'Spring',
               6:'Summer',7:'Summer',8:'Summer',9:'Autumn',10:'Autumn',11:'Autumn',12:'Winter'};
    const seasons=[['3','4','5'],['6','7','8'],['9','10','11'],['12','1','2']];
    const m=pick(seasons[slot-1]);
    return {input:m,expected:map[parseInt(m)]};
  },

  p3: (slot)=>{
    const prices={1:1500,2:1200,3:2000,4:800};
    if(slot===4) return {input:`5\n${ri(500,3000)}`,expected:'Invalid selection!'};
    const ch=slot, price=prices[ch];
    const enough=ri(1,2)===1;
    const money=enough?price+ri(0,50)*10:ri(100,price-100);
    const exp=money>=price?`Dispensing... Change: ${money-price} won`:`Insufficient! Need ${price-money} more won`;
    return {input:`${ch}\n${money}`,expected:exp};
  },

  p4: (slot)=>{
    if(slot===1){const s=ri(90,100);return {input:`${s}`,expected:'Grade: A'};}
    if(slot===2){const s=ri(60,69);return {input:`${s}`,expected:'Grade: D'};}
    if(slot===3){const s=ri(0,59);return {input:`${s}`,expected:'Grade: F'};}
    return {input:`${-ri(1,50)}`,expected:'Invalid score'};
  },

  c1: (slot)=>{
    const incomes=[[1000000,14000000],[14000001,50000000],[50000001,88000000],[88000001,200000000]];
    const [lo,hi]=incomes[slot-1]; const inc=ri(lo,hi);
    let tax=0;
    if(inc>88000000) tax=840000+5400000+9120000+(inc-88000000)*0.35;
    else if(inc>50000000) tax=840000+5400000+(inc-50000000)*0.24;
    else if(inc>14000000) tax=840000+(inc-14000000)*0.15;
    else tax=inc*0.06;
    return {input:`${inc}`,expected:`Tax: ${Math.round(tax)} won`};
  },

  c2: (slot)=>{
    const gv=c=>{c=c.toUpperCase();return c==='A'?11:('2'<=c&&c<='9'?c.charCodeAt(0)-48:10);};
    const fmt=(c1,c2)=>{const v1=gv(c1),v2=gv(c2),t=v1+v2;const s=t===21?' (Blackjack!)':t>21?' (Bust)':'';return {input:`${c1}\n${c2}`,expected:`Card 1: ${v1}\nCard 2: ${v2}\nTotal: ${t}${s}`};};
    if(slot===1) return fmt('A',pick(['T','J','Q','K']));
    if(slot===2) return fmt('A','A');
    if(slot===3){const c=pick(['5','6','7','8','9']);return fmt(c,pick(['T','J','Q','K']));}
    return fmt(pick(['t','j','q','k']),pick(['2','3','4','5','6','7']));
  },

  c3: (slot)=>{
    const base=[0,5,10,15,20];
    if(slot===1){const m=pick([1,2]);const amt=ri(1,9)*10000;const d=base[m];return {input:`${m}\n${amt}`,expected:`Discount: ${d}%\nFinal: ${amt-amt*d/100} won`};}
    if(slot===2){const m=pick([3,4]);const amt=ri(1,9)*10000;const d=base[m];return {input:`${m}\n${amt}`,expected:`Discount: ${d}%\nFinal: ${amt-amt*d/100} won`};}
    if(slot===3){const m=pick([1,2,3,4]);const amt=ri(10,20)*10000;const d=base[m]+5;return {input:`${m}\n${amt}`,expected:`Discount: ${d}%\nFinal: ${amt-amt*d/100} won`};}
    const m=4;const amt=ri(10,30)*10000;const d=25;return {input:`${m}\n${amt}`,expected:`Discount: ${d}%\nFinal: ${amt-amt*d/100} won`};
  },

  c4: (slot)=>{
    if(slot===1){const km=ri(1,100);return {input:`1\n${km}`,expected:`${km.toFixed(2)} km = ${(km*0.621371).toFixed(2)} mi`};}
    if(slot===2){const c_=ri(-20,40);return {input:`2\n${c_}`,expected:`${c_.toFixed(2)} C = ${(c_*9.0/5.0+32).toFixed(2)} F`};}
    if(slot===3){const kg=ri(1,100);return {input:`3\n${kg}`,expected:`${kg.toFixed(2)} kg = ${(kg*2.20462).toFixed(2)} lb`};}
    const cm=ri(1,200);return {input:`4\n${cm}`,expected:`${cm.toFixed(2)} cm = ${(cm/2.54).toFixed(2)} in`};
  },

  c5: (slot)=>{
    if(slot===1) return {input:`${ri(1,2)===1?ri(1000,1233):ri(1235,9999)}\n1`,expected:'Wrong PIN!'};
    if(slot===2) return {input:`1234\n1`,expected:'Balance: 100000 won'};
    if(slot===3){ const d=ri(1000,90000); return {input:`1234\n2\n${d}`,expected:`Balance: ${100000+d} won`}; }
    return {input:`1234\n3\n${ri(100001,500000)}`,expected:'Insufficient!\nBalance: 100000 won'};
  },

  /* ── Week 6B: Loops ── */
  lp1: (slot)=>{
    const ns=[10,100,1,1000];
    const n=ns[slot-1]||ri(1,200);
    return {input:`${n}`,expected:`Sum: ${n*(n+1)/2}`};
  },
  lp2: (slot)=>{
    const n=[2,5,7,9][slot-1];
    const lines=[];
    for(let i=1;i<=9;i++) lines.push(`${n} x ${i} = ${n*i}`);
    return {input:`${n}`,expected:lines.join('\n')};
  },
  lp3: (slot)=>{
    const nums=[12345,100,7,80706];
    const n=nums[slot-1];
    const rev=parseInt(String(n).split('').reverse().join(''),10);
    return {input:`${n}`,expected:`Reversed: ${rev}`};
  },
  lp4: (slot)=>{
    const ns=[1,10,20,30];
    const n=ns[slot-1];
    let a=1,b=1;
    for(let i=3;i<=n;i++){const t=a+b;a=b;b=t;}
    const fib=n===1?1:b;
    return {input:`${n}`,expected:`F(${n}) = ${fib}`};
  },
  lp5: (slot)=>{
    if(slot===1){const ns=[1,2,3,4,5];return {input:ns.join('\n')+'\n0',expected:`Sum: ${ns.reduce((a,b)=>a+b,0)}`};}
    if(slot===2){const ns=[10,20,30];return {input:ns.join('\n')+'\n0',expected:`Sum: ${ns.reduce((a,b)=>a+b,0)}`};}
    if(slot===3) return {input:'0',expected:'Sum: 0'};
    const ns=Array.from({length:ri(3,8)},()=>ri(1,50));
    return {input:ns.join('\n')+'\n0',expected:`Sum: ${ns.reduce((a,b)=>a+b,0)}`};
  },
  lp6: (slot)=>{
    const gen=()=>{
      const n=ri(2,8);
      const arr=Array.from({length:n},()=>ri(-100,100));
      const input=`${n}\n`+arr.join('\n');
      return {input,expected:`Min: ${Math.min(...arr)}\nMax: ${Math.max(...arr)}`};
    };
    if(slot===1) return {input:'5\n3\n-1\n7\n2\n4',expected:'Min: -1\nMax: 7'};
    if(slot===2) return {input:'1\n42',expected:'Min: 42\nMax: 42'};
    if(slot===3) return {input:'4\n-5\n-10\n-3\n-8',expected:'Min: -10\nMax: -3'};
    return gen();
  },

  lc1: (slot)=>{
    const ns=[10,30,100,1];
    const n=ns[slot-1]||ri(2,200);
    const isPrime=x=>{if(x<2)return false;for(let i=2;i*i<=x;i++)if(x%i===0)return false;return true;};
    let cnt=0; for(let i=2;i<=n;i++) if(isPrime(i)) cnt++;
    return {input:`${n}`,expected:`Primes <= ${n}: ${cnt}`};
  },
  lc2: (slot)=>{
    const pairs=[[48,18],[100,75],[17,31],[60,24]];
    const [a,b]=pairs[slot-1]||[ri(1,100),ri(1,100)];
    let x=a,y=b; while(y){const t=y;y=x%y;x=t;}
    return {input:`${a} ${b}`,expected:`GCD: ${x}`};
  },
  lc3: (slot)=>{
    const ns=[1,6,27,9];
    const n=ns[slot-1]||ri(1,100);
    let x=n,steps=0; while(x!==1){x=x%2===0?x/2:3*x+1;steps++;}
    return {input:`${n}`,expected:`Steps: ${steps}`};
  },
  lc4: (slot)=>{
    const ns=[2,3,4,5];
    const n=ns[slot-1];
    const rows=[];
    for(let i=1;i<=n;i++) rows.push(' '.repeat(n-i)+'*'.repeat(2*i-1));
    for(let i=n-1;i>=1;i--) rows.push(' '.repeat(n-i)+'*'.repeat(2*i-1));
    return {input:`${n}`,expected:rows.join('\n')};
  },
  lc5: (slot)=>{
    const ns=[9875,493,5,99999];
    const n=ns[slot-1]||ri(10,9999);
    const digitSum=x=>String(x).split('').reduce((s,c)=>s+parseInt(c),0);
    const steps=[n];
    while(steps[steps.length-1]>=10) steps.push(digitSum(steps[steps.length-1]));
    return {input:`${n}`,expected:steps.join(' -> ')};
  },
  lc6: (slot)=>{
    const ns=[10,1,255,16];
    const n=ns[slot-1]||ri(1,1000);
    return {input:`${n}`,expected:`Binary: ${n.toString(2)}`};
  },

  /* ── Week 7: Functions ── */
  fp1: (slot)=>{
    const pairs=[[2,10],[3,0],[5,3],[7,4]];
    const [base,exp]=pairs[slot-1]||[ri(2,9),ri(0,8)];
    let r=1; for(let i=0;i<exp;i++) r*=base;
    return {input:`${base} ${exp}`,expected:`Result: ${r}`};
  },
  fp2: (slot)=>{
    const ns=[0,5,10,12];
    const n=ns[slot-1];
    let f=1; for(let i=2;i<=n;i++) f*=i;
    return {input:`${n}`,expected:`N! = ${f}`};
  },
  fp3: (slot)=>{
    const isPrime=x=>{if(x<2)return false;for(let i=2;i*i<=x;i++)if(x%i===0)return false;return true;};
    const primes=[7,2,11,13];
    const nonPrimes=[1,4,100,9];
    if(slot===1||slot===3) {const n=primes[slot-1]; return {input:`${n}`,expected:`Prime: Yes`};}
    const n=nonPrimes[slot-1]; return {input:`${n}`,expected:'Prime: No'};
  },
  fp4: (slot)=>{
    const pairs=[[12,8],[10,15],[7,3],[18,24]];
    const [a,b]=pairs[slot-1]||[ri(2,50),ri(2,50)];
    let x=a,y=b; while(y){const t=y;y=x%y;x=t;} const g=x;
    return {input:`${a} ${b}`,expected:`GCD: ${g}\nLCM: ${a/g*b}`};
  },
  fc1: (slot)=>{
    const pairs=[[5,2],[10,3],[6,0],[10,10]];
    const [n,r]=pairs[slot-1]||[ri(5,15),ri(0,5)];
    let f=x=>{let v=1;for(let i=2;i<=x;i++)v*=i;return v;};
    return {input:`${n} ${r}`,expected:`C(n,r) = ${f(n)/(f(r)*f(n-r))}`};
  },
  fc2: (slot)=>{
    const perfects=[6,28,496];
    const nonP=[12,15];
    if(slot===1) return {input:'6', expected:'Perfect: Yes'};
    if(slot===2) return {input:'28',expected:'Perfect: Yes'};
    if(slot===3) return {input:'12',expected:'Perfect: No'};
    return {input:'496',expected:'Perfect: Yes'};
  },
  fc3: (slot)=>{
    const ns=[10,100,30,2];
    const n=ns[slot-1]||ri(2,50);
    const isPrime=x=>{if(x<2)return false;for(let i=2;i*i<=x;i++)if(x%i===0)return false;return true;};
    let sum=0; for(let i=2;i<=n;i++) if(isPrime(i)) sum+=i;
    return {input:`${n}`,expected:`Sum: ${sum}`};
  },

  /* ── Week 9A: Arrays ── */
  ap1: (slot)=>{
    const arrs=[[10,20,30,40,50],[7],['-3',0,5,'-2',8,1],[1,2,3,4,5,6,7,8,9,10]];
    const arr=slot<=4?arrs[slot-1]:Array.from({length:ri(3,8)},()=>ri(-50,50));
    const n=arr.length;
    return {input:`${n}\n${arr.join(' ')}`,expected:`${[...arr].reverse().join(' ')}`};
  },
  ap2: (slot)=>{
    const gen=()=>{
      const n=ri(3,8);
      const arr=Array.from({length:n},()=>ri(0,100));
      const avg=arr.reduce((a,b)=>a+b,0)/n;
      const above=arr.filter(x=>x>avg).length;
      return {input:`${n}\n${arr.join(' ')}`,expected:`Above: ${above}`};
    };
    if(slot===1) return {input:'5\n70 80 90 60 50',expected:'Above: 2'};
    if(slot===2) return {input:'1\n100',expected:'Above: 0'};
    if(slot===3) return {input:'6\n10 10 10 10 10 10',expected:'Above: 0'};
    return gen();
  },
  ap3: (slot)=>{
    const gen=()=>{
      const n=ri(3,8);
      const arr=Array.from({length:n},()=>ri(1,50));
      const max1=Math.max(...arr);
      const below=arr.filter(x=>x<max1);
      const second=below.length>0?Math.max(...below):max1;
      return {input:`${n}\n${arr.join(' ')}`,expected:`Second: ${second}`};
    };
    if(slot===1) return {input:'5\n3 1 4 1 5',expected:'Second: 4'};
    if(slot===2) return {input:'4\n5 3 5 1',expected:'Second: 3'};
    if(slot===3) return {input:'6\n10 20 30 40 50 60',expected:'Second: 50'};
    return gen();
  },
  ap4: (slot)=>{
    const gen=()=>{
      const n=ri(5,10);
      const arr=Array.from({length:n},()=>ri(1,10));
      const x=pick(arr);
      return {input:`${n}\n${arr.join(' ')}\n${x}`,expected:`Count: ${arr.filter(v=>v===x).length}`};
    };
    if(slot===1) return {input:'8\n3 1 4 1 5 9 2 6\n1',expected:'Count: 2'};
    if(slot===2) return {input:'5\n7 7 7 7 7\n7',expected:'Count: 5'};
    if(slot===3) return {input:'5\n1 2 3 4 5\n10',expected:'Count: 0'};
    return gen();
  },
  ap5: (slot)=>{
    const gen=()=>{
      const n=ri(3,8);
      const arr=Array.from({length:n},()=>ri(-20,20));
      const rotated=[arr[n-1],...arr.slice(0,n-1)];
      return {input:`${n}\n${arr.join(' ')}`,expected:rotated.join(' ')};
    };
    if(slot===1) return {input:'5\n1 2 3 4 5',expected:'5 1 2 3 4'};
    if(slot===2) return {input:'1\n42',expected:'42'};
    if(slot===3) return {input:'6\n10 20 30 40 50 60',expected:'60 10 20 30 40 50'};
    return gen();
  },
  ap6: (slot)=>{
    if(slot===1) return {input:'5\n1 2 3 2 1',expected:'Palindrome: Yes'};
    if(slot===2) return {input:'3\n1 2 3',expected:'Palindrome: No'};
    if(slot===3) return {input:'1\n42',expected:'Palindrome: Yes'};
    const n=ri(4,8);
    const half=Array.from({length:Math.floor(n/2)},()=>ri(1,20));
    const arr=n%2===0?[...half,...[...half].reverse()]:[...half,ri(1,20),...[...half].reverse()];
    const isPalin=arr.every((v,i)=>v===arr[n-1-i]);
    return {input:`${n}\n${arr.join(' ')}`,expected:`Palindrome: ${isPalin?'Yes':'No'}`};
  },
  ac1: (slot)=>{
    const gen=()=>{
      const n=ri(2,5);
      const mat=Array.from({length:n},()=>Array.from({length:n},()=>ri(-10,10)));
      const diag=mat.reduce((s,row,i)=>s+row[i],0);
      return {input:`${n}\n`+mat.map(r=>r.join(' ')).join('\n'),expected:`Diagonal: ${diag}`};
    };
    if(slot===1) return {input:'3\n1 2 3\n4 5 6\n7 8 9',expected:'Diagonal: 15'};
    if(slot===2) return {input:'1\n42',expected:'Diagonal: 42'};
    if(slot===3) return {input:'4\n1 0 0 0\n0 2 0 0\n0 0 3 0\n0 0 0 4',expected:'Diagonal: 10'};
    return gen();
  },
  ac2: (slot)=>{
    const fmt=x=>String(x).padStart(4,' ');
    const gen=(R,C,mat)=>{
      const T=Array.from({length:C},(_,j)=>Array.from({length:R},(_,i)=>mat[i][j]));
      return {input:`${R} ${C}\n`+mat.map(r=>r.join(' ')).join('\n'),expected:T.map(r=>r.map(fmt).join('')).join('\n')};
    };
    if(slot===1){const mat=[[1,2,3,4],[5,6,7,8],[9,10,11,12]];return gen(3,4,mat);}
    if(slot===2){const mat=[[1,2],[3,4]];return gen(2,2,mat);}
    if(slot===3){const mat=[[10,20,30,40,50]];return gen(1,5,mat);}
    const R=ri(2,4),C=ri(2,4);
    const mat=Array.from({length:R},()=>Array.from({length:C},()=>ri(1,20)));
    return gen(R,C,mat);
  },

  /* ── Week 9B: Strings ── */
  sc1: (slot)=>{
    const shift=(s,k)=>s.split('').map(c=>{
      if(c>='A'&&c<='Z') return String.fromCharCode((c.charCodeAt(0)-65+((k%26)+26))%26+65);
      if(c>='a'&&c<='z') return String.fromCharCode((c.charCodeAt(0)-97+((k%26)+26))%26+97);
      return c;
    }).join('');
    const pairs=[['Hello, World!',3],['abcXYZ',1],['Khoor, Zruog!',-3],['Programming 2026!',26]];
    const [s,k]=pairs[slot-1];
    return {input:`${s}\n${k}`,expected:shift(s,k)};
  },
  sc2: (slot)=>{
    const rev=s=>s.trim().split(/\s+/).filter(w=>w).reverse().join(' ');
    const strs=['Hello World C','the quick brown fox','single','  multiple   spaces  here'];
    const s=strs[slot-1];
    return {input:s,expected:rev(s)};
  },
  sc3: (slot)=>{
    const process=cmds=>{
      const out=[];
      for(const cmd of cmds){
        if(cmd==='QUIT') break;
        if(cmd==='LED ON') out.push('LED is now ON');
        else if(cmd==='LED OFF') out.push('LED is now OFF');
        else out.push('Unknown command');
      }
      return out.join('\n');
    };
    const scenarios=[
      ['LED ON','LED OFF','FOO','QUIT','LED ON'],
      ['LED ON','LED OFF','QUIT'],
      ['BAD','XYZ 5','LED ON','QUIT'],
      ['LED ON','HELLO','LED OFF','WORLD','QUIT'],
    ];
    const cmds=scenarios[slot-1];
    return {input:cmds.join('\n'),expected:process(cmds)};
  },
  sp1: (slot)=>{
    const count=s=>{
      const vowels='aeiou';
      let v=0,c=0;
      for(const ch of s.toLowerCase()) if(/[a-z]/.test(ch)){if(vowels.includes(ch))v++;else c++;}
      return {v,c};
    };
    const strs=['Hello World','AEIOU aeiou','Programming','C 2026'];
    const s=strs[slot-1];
    const {v,c}=count(s);
    return {input:s,expected:`Vowels: ${v}\nConsonants: ${c}`};
  },
  sp2: (slot)=>{
    const wcount=s=>(s.trim()===''?0:s.trim().split(/\s+/).length);
    const strs=['Hello world from C','  multiple   spaces   here  ','single','       '];
    const s=strs[slot-1];
    return {input:s,expected:`Words: ${wcount(s)}`};
  },
  sp3: (slot)=>{
    const strs=['Hello, World!','abc','racecar','C 2026'];
    const s=strs[slot-1];
    return {input:s,expected:s.split('').reverse().join('')};
  },
  sp4: (slot)=>{
    const rle=s=>{let r='',i=0;while(i<s.length){let c=s[i],cnt=0;while(i<s.length&&s[i]===c){cnt++;i++;}r+=`${cnt}${c}`;}return r;};
    const strs=['aaabbc','aaa','abcd','aaabbbccc'];
    const s=strs[slot-1];
    return {input:s,expected:rle(s)};
  },
  sp5: (slot)=>{
    const count=(s,p)=>{let cnt=0,i=0;while(i<=s.length-p.length){if(s.slice(i,i+p.length)===p){cnt++;i+=p.length;}else i++;}return cnt;};
    const pairs=[['abababab','ab'],['aaaa','aa'],['Hello world hello world','hello'],['abcdefg','xyz']];
    const [s,p]=pairs[slot-1];
    return {input:`${s}\n${p}`,expected:`Count: ${count(s,p)}`};
  },

  /* ── Week 10A: Pointers ── */
  pc1: (slot)=>{
    const gen=()=>{
      const n=ri(4,8);
      const target=ri(1,5);
      const arr=Array.from({length:n},()=>ri(1,5));
      const kept=arr.filter(x=>x!==target);
      const out=`Count: ${kept.length}`+(kept.length>0?'\n'+kept.join(' '):'');
      return {input:`${n}\n${arr.join(' ')}\n${target}`,expected:out};
    };
    if(slot===1) return {input:'6\n1 2 3 2 4 2\n2',expected:'Count: 3\n1 3 4'};
    if(slot===2) return {input:'4\n1 2 3 4\n9',expected:'Count: 4\n1 2 3 4'};
    if(slot===3) return {input:'5\n0 -1 0 -2 0\n0',expected:'Count: 2\n-1 -2'};
    return gen();
  },
  pc2: (slot)=>{
    const secondMax=arr=>{
      const max1=Math.max(...arr);
      const below=arr.filter(x=>x<max1);
      return below.length>0?`Second max: ${Math.max(...below)}`:'No second max';
    };
    if(slot===1) return {input:'5\n3 7 2 9 5',expected:'Second max: 7'};
    if(slot===2) return {input:'5\n1 1 1 1 1',expected:'No second max'};
    if(slot===3) return {input:'2\n4 9',expected:'Second max: 4'};
    const n=ri(4,7);
    const arr=Array.from({length:n},()=>ri(1,20));
    return {input:`${n}\n${arr.join(' ')}`,expected:secondMax(arr)};
  },
  pp1: (slot)=>{
    const pairs=[[1,2],[10,-5],[0,100],[-3,-7]];
    const [a,b]=pairs[slot-1]||[ri(-50,50),ri(-50,50)];
    return {input:`${a} ${b}`,expected:`${b} ${a}`};
  },
  pp2: (slot)=>{
    const gen=()=>{
      const n=ri(3,8);
      const arr=Array.from({length:n},()=>ri(-20,20));
      return {input:`${n}\n${arr.join(' ')}`,expected:[...arr].reverse().join(' ')};
    };
    if(slot===1) return {input:'5\n1 2 3 4 5',expected:'5 4 3 2 1'};
    if(slot===2) return {input:'4\n10 20 30 40',expected:'40 30 20 10'};
    if(slot===3) return {input:'1\n42',expected:'42'};
    return gen();
  },
  pp3: (slot)=>{
    const gen=()=>{
      const n=ri(3,8);
      const arr=Array.from({length:n},()=>ri(-20,20));
      const sum=arr.reduce((a,b)=>a+b,0);
      const mn=Math.min(...arr), mx=Math.max(...arr);
      const avg=(sum/n).toFixed(2);
      return {input:`${n}\n${arr.join(' ')}`,expected:`Sum: ${sum}\nMin: ${mn}\nMax: ${mx}\nAvg: ${avg}`};
    };
    if(slot===1) return {input:'5\n1 2 3 4 5',expected:'Sum: 15\nMin: 1\nMax: 5\nAvg: 3.00'};
    if(slot===2) return {input:'3\n10 20 30',expected:'Sum: 60\nMin: 10\nMax: 30\nAvg: 20.00'};
    if(slot===3) return {input:'4\n-2 -5 0 3',expected:'Sum: -4\nMin: -5\nMax: 3\nAvg: -1.00'};
    return gen();
  },
  pp4: (slot)=>{
    const gen=()=>{
      const n=ri(4,8);
      const arr=Array.from({length:n},()=>ri(-10,10));
      const idx=arr.findIndex(x=>x<0);
      const expected=idx>=0?`Found: ${arr[idx]} at index ${idx}`:'Not found';
      return {input:`${n}\n${arr.join(' ')}`,expected};
    };
    if(slot===1) return {input:'5\n3 -1 5 -2 0',expected:'Found: -1 at index 1'};
    if(slot===2) return {input:'4\n1 2 3 4',expected:'Not found'};
    if(slot===3) return {input:'3\n-5 0 1',expected:'Found: -5 at index 0'};
    return gen();
  },
  pp5: (slot)=>{
    const gen=()=>{
      const n=ri(3,7);
      const arr=Array.from({length:n},()=>ri(-10,20));
      const max=Math.max(...arr);
      const idx=arr.indexOf(max);
      const after=[...arr]; after[idx]=0;
      return {input:`${n}\n${arr.join(' ')}`,expected:`Max: ${max} at index ${idx}\n${after.join(' ')}`};
    };
    if(slot===1) return {input:'5\n3 7 2 9 5',expected:'Max: 9 at index 3\n3 7 2 0 5'};
    if(slot===2) return {input:'4\n-1 -5 -2 -3',expected:'Max: -1 at index 0\n0 -5 -2 -3'};
    if(slot===3) return {input:'5\n10 20 30 20 10',expected:'Max: 30 at index 2\n10 20 0 20 10'};
    return gen();
  },

  /* ── Week 10B: Pointers Part B ── */
  bp1: (slot)=>{
    const x=[5,0,-3,100][slot-1]??ri(-50,50);
    return {input:`${x}`,expected:`Before: ${x}\nAfter: ${x*2}`};
  },
  bp2: (slot)=>{
    const words=['mississippi','hello','programming','pointer','function','variable','algorithm','compiler'];
    const s=slot<=2?['mississippi','hello'][slot-1]:pick(words);
    const chars=[...'abcdefghijklmnopqrstuvwxyz'];
    const c=slot===1?'s':slot===2?'l':slot===3?pick([...new Set(s.split(''))]):pick(chars);
    const count=[...s].filter(ch=>ch===c).length;
    return {input:`${s}\n${c}`,expected:`Count: ${count}`};
  },
  bp3: (slot)=>{
    const n=ri(3,6);
    const arr=Array.from({length:n},()=>ri(-10,10));
    const choice=slot<=3?slot:ri(1,3);
    const fns=[x=>x*x,x=>2*x,x=>-x];
    const result=arr.map(fns[choice-1]);
    return {input:`${n}\n${arr.join(' ')}\n${choice}`,expected:result.join(' ')};
  },
  bp4: (slot)=>{
    const ms=[3,2,1,3],ns=[4,3,5,2];
    const m=ms[slot-1]||ri(2,4),n=ns[slot-1]||ri(2,4);
    const mat=Array.from({length:m},()=>Array.from({length:n},()=>ri(-10,20)));
    return {input:`${m} ${n}\n`+mat.map(r=>r.join(' ')).join('\n'),expected:mat.map((row,i)=>`Row ${i}: ${Math.max(...row)}`).join('\n')};
  },
  bp5: (slot)=>{
    const pool=['apple','banana','kiwi','cat','dog','pig','cow','hello','hi','programming','c','fun','world'];
    const n=ri(3,6);
    const words=Array.from({length:n},()=>pick(pool));
    // ensure unique longest
    const maxLen=Math.max(...words.map(w=>w.length));
    const longest=words.find(w=>w.length===maxLen);
    return {input:`${n}\n${words.join('\n')}`,expected:longest};
  },
  bc1: (slot)=>{
    const pool=['Hello','abcde','programming','pointer','reverse','function','algorithm'];
    const s=slot<=2?['Hello','abcde'][slot-1]:pick(pool);
    return {input:s,expected:s.split('').reverse().join('')};
  },
  bc2: (slot)=>{
    const pool=['apple','banana','cherry','date','fig','grape','kiwi','lemon','mango','orange','peach','plum'];
    const n=ri(3,6);
    const words=Array.from({length:n},()=>pick(pool));
    const sorted=[...words].sort();
    return {input:`${n}\n${words.join('\n')}`,expected:sorted.join('\n')};
  },


};

function buildCases(pid){
  const gen=GEN[pid];
  if(!gen) return null;
  return [1,2,3,4].map((slot,i)=>({id:i+1,...gen(slot),pts:25}));
}

const PROBLEMS = [
  {
    "id": "dr1",
    "createdAt": "2026-05-28T00:00",
    "deadline": "2026-06-04T23:59",
    "cases": [
      {
        "input": "3\n10 20 30\n5\n",
        "pts": 25,
        "id": 1,
        "expected": "10 20 30 0 0\n"
      },
      {
        "input": "5\n1 2 3 4 5\n3\n",
        "id": 2,
        "pts": 25,
        "expected": "1 2 3\n"
      },
      {
        "expected": "7 8 9 10\n",
        "pts": 25,
        "input": "4\n7 8 9 10\n4\n",
        "id": 3
      },
      {
        "input": "1\n42\n6\n",
        "id": 4,
        "pts": 25,
        "expected": "42 0 0 0 0 0\n"
      }
    ],
    "ex_in": "3\n10 20 30\n5",
    "week": "Week 13B: Dynamic Memory – Part B",
    "input_desc": "첫째 줄에 N (1 ≤ N ≤ 100).<br>둘째 줄에 N개의 정수 (공백 구분).<br>셋째 줄에 M (1 ≤ M ≤ 200).",
    "ex_out": "10 20 30 0 0",
    "output_desc": "리사이즈된 배열의 M개 원소를 공백으로 구분하여 한 줄에 출력.<br><b>마지막 숫자 뒤에 공백 없음.</b>",
    "title": "Resize Array",
    "desc": "크기 N의 정수 배열을 <code>malloc</code>으로 만들고 값을 채운 뒤, <code>realloc</code>으로 크기를 M으로 변경하시오.<br><br><b>규칙:</b><ul><li>M &gt; N이면: 새로 늘어난 자리에 <code>0</code>을 채운다.</li><li>M &lt; N이면: 앞 M개만 남긴다 (뒤는 버린다).</li><li>M == N이면: 변화 없음.</li></ul><b>반드시 <code>realloc</code>의 반환값을 임시 포인터로 받으시오</b> (강의 tmp 패턴).<br><br>Hint:<br><code>int *tmp = realloc(arr, m * sizeof(int));</code><br><code>if (!tmp) { free(arr); return 1; }</code><br><code>arr = tmp;</code><br>늘어난 구간 초기화: <code>for (i = n; i &lt; m; i++) arr[i] = 0;</code>"
  },
  {
    "id": "dr2",
    "createdAt": "2026-05-28T00:00",
    "deadline": "2026-06-04T23:59",
    "cases": [
      {
        "pts": 25,
        "input": "5\n10\n15\n20\n25\n30\n-1\n",
        "id": 1,
        "expected": "5 10 15 20 25 30\nCount: 6\n"
      },
      {
        "pts": 25,
        "id": 2,
        "input": "1\n2\n3\n-1\n",
        "expected": "1 2 3\nCount: 3\n"
      },
      {
        "pts": 25,
        "id": 3,
        "input": "100\n-1\n",
        "expected": "100\nCount: 1\n"
      },
      {
        "pts": 25,
        "id": 4,
        "input": "1\n2\n3\n4\n5\n6\n7\n8\n9\n-1\n",
        "expected": "1 2 3 4 5 6 7 8 9\nCount: 9\n"
      }
    ],
    "desc": "정수를 계속 입력받다가 <code>-1</code>이 입력되면 멈추고, 저장된 모든 수를 한 줄에 출력한 뒤 개수를 출력하시오. <code>-1</code>은 저장하지 않습니다.<br><br><b>핵심 패턴 (double-when-full):</b><ol><li>초기: <code>capacity = 4</code>, <code>size = 0</code>, <code>arr = malloc(4 * sizeof(int))</code></li><li>입력을 받을 때마다 <code>size == capacity</code>이면:<br><code>capacity *= 2;</code><br><code>int *tmp = realloc(arr, capacity * sizeof(int));</code><br>tmp가 NULL이면 에러 처리, 아니면 <code>arr = tmp;</code></li><li><code>arr[size++] = val;</code></li></ol>이 패턴은 Python의 list, C++의 vector, Java의 ArrayList가 내부적으로 사용하는 방식과 동일합니다.<br><br>Hint: <code>-1</code>이 첫 입력으로 바로 오면 아무것도 저장되지 않으므로 <code>Count: 0</code>을 출력합니다.",
    "output_desc": "첫째 줄: 저장된 수를 입력 순서대로 공백 구분 출력 (0개면 빈 줄).<br>둘째 줄: <code>Count: (개수)</code>",
    "title": "Growing Array",
    "ex_out": "5 10 15 20 25 30\nCount: 6",
    "input_desc": "한 줄에 정수 하나씩 입력. <code>-1</code>이 나오면 종료.<br>정수 범위: -1000 ≤ 값 ≤ 1000 (단 <code>-1</code>은 종료 신호).",
    "ex_in": "5\n10\n15\n20\n25\n30\n-1",
    "week": "Week 13B: Dynamic Memory – Part B"
  },
  {
    "id": "dr3",
    "createdAt": "2026-05-28T00:00",
    "deadline": "2026-06-04T23:59",
    "cases": [
      {
        "pts": 25,
        "input": "3\n1 2 3\n2\n4 5\n",
        "id": 1,
        "expected": "1 2 3 4 5\n"
      },
      {
        "expected": "10 20\n",
        "input": "1\n10\n1\n20\n",
        "pts": 25,
        "id": 2
      },
      {
        "expected": "5 6 7 8 1 2 3\n",
        "pts": 25,
        "input": "4\n5 6 7 8\n3\n1 2 3\n",
        "id": 3
      },
      {
        "expected": "-1 -2 -3 -4\n",
        "input": "2\n-1 -2\n2\n-3 -4\n",
        "id": 4,
        "pts": 25
      }
    ],
    "output_desc": "합쳐진 배열을 한 줄에 공백 구분 출력. <b>마지막 숫자 뒤에 공백 없음.</b>",
    "title": "Array Concatenation",
    "desc": "두 개의 정수 배열을 입력받아, 두 배열을 이어붙인 새 배열을 <b>함수</b>로 만들어 반환하시오.<br><br>함수 원형:<br><code>int *concat(int *a, int na, int *b, int nb)</code><br><ul><li><code>malloc((na + nb) * sizeof(int))</code>로 새 배열을 할당</li><li>a의 원소를 먼저, b의 원소를 뒤에 복사</li><li>새 배열의 포인터를 반환</li></ul><b>이 패턴이 중요한 이유:</b> 함수 안에서 <code>malloc</code>한 메모리는 <b>heap</b>에 있으므로 함수가 끝나도 살아있습니다. caller(main)가 사용 후 <code>free</code>해야 합니다.<br><br>Hint: 반복문으로 복사하거나 <code>memcpy</code>를 사용하세요.",
    "ex_in": "3\n1 2 3\n2\n4 5",
    "week": "Week 13B: Dynamic Memory – Part B",
    "input_desc": "첫째 줄에 N1, 둘째 줄에 N1개의 정수 (공백 구분).<br>셋째 줄에 N2, 넷째 줄에 N2개의 정수 (공백 구분).<br>(1 ≤ N1, N2 ≤ 50)",
    "ex_out": "1 2 3 4 5"
  },
  {
    "id": "dr4",
    "createdAt": "2026-05-28T00:00",
    "deadline": "2026-06-04T23:59",
    "cases": [
      {
        "expected": "Bob 92\nDave 92\nAlice 85\nCarol 78\n",
        "id": 1,
        "pts": 25,
        "input": "Alice 85\nBob 92\nCarol 78\nDave 92\nend\n"
      },
      {
        "id": 2,
        "pts": 25,
        "input": "Solo 100\nend\n",
        "expected": "Solo 100\n"
      },
      {
        "input": "E 30\nD 10\nC 50\nB 40\nA 20\nend\n",
        "id": 3,
        "pts": 25,
        "expected": "C 50\nB 40\nE 30\nA 20\nD 10\n"
      },
      {
        "expected": "Lee 95\nHan 95\nKim 88\nChoi 88\nPark 72\nJung 60\n",
        "pts": 25,
        "id": 4,
        "input": "Kim 88\nLee 95\nPark 72\nChoi 88\nJung 60\nHan 95\nend\n"
      }
    ],
    "ex_in": "Alice 85\nBob 92\nCarol 78\nDave 92\nend",
    "week": "Week 13B: Dynamic Memory – Part B",
    "ex_out": "Bob 92\nDave 92\nAlice 85\nCarol 78",
    "input_desc": "매 줄에 이름(공백없음, 최대 29자)과 점수(정수).<br><code>end</code>가 나오면 입력 종료 (end 뒤에 점수 없음).",
    "title": "Growing Student Records",
    "output_desc": "점수 <b>내림차순</b>으로 <code>이름 점수</code>를 한 줄씩 출력.<br>동점이면 입력 순서 유지.",
    "desc": "학생의 이름과 점수를 반복 입력받고, 이름이 <code>end</code>이면 멈추시오. 그 뒤 점수 내림차순으로 정렬하여 출력하시오.<br><br><b>이 문제가 연습하는 것:</b> <code>realloc</code>으로 <b>구조체 배열</b>을 동적으로 키우기.<br><br><b>구조체 정의:</b><br><code>typedef struct { char name[30]; int score; } Student;</code><br><br><b>구현 순서:</b><ol><li>초기: <code>cap = 2</code>, <code>size = 0</code>, <code>Student *arr = malloc(cap * sizeof(Student));</code></li><li>이름을 읽어서 <code>\"end\"</code>이면 중단</li><li><code>size == cap</code>이면 <code>cap *= 2</code>하고 <code>realloc</code> (tmp 패턴)</li><li>구조체에 이름과 점수 저장, <code>size++</code></li><li>전부 읽은 뒤 점수 내림차순 bubble sort</li><li>출력 후 <code>free</code></li></ol>Hint: 구조체 전체를 swap — <code>Student tmp = arr[j]; arr[j] = arr[j+1]; arr[j+1] = tmp;</code>"
  },
  {
    "id": "dr5",
    "week": "Week 13B: Dynamic Memory – Part B",
    "ex_in": "2 3\n1 2 3\n4 5 6",
    "ex_out": "Row 0: 6\nRow 1: 15\nTotal: 21",
    "input_desc": "첫째 줄에 R C (1 ≤ R, C ≤ 10).<br>다음 R줄에 C개의 정수 (공백 구분).",
    "output_desc": "각 행마다 <code>Row i: (합)</code> 출력 (i는 0부터).<br>마지막에 <code>Total: (전체 합)</code>",
    "title": "Dynamic 2D Matrix Sum",
    "desc": "R행 C열의 행렬을 <b>동적 2D 배열</b>로 할당하여 입력받고, 각 행의 합과 전체 합을 출력하시오.<br><br><b>동적 2D 배열 할당 패턴:</b><br><code>int **mat = (int **)malloc(R * sizeof(int *));</code><br><code>for (i = 0; i &lt; R; i++)</code><br>&nbsp;&nbsp;&nbsp;&nbsp;<code>mat[i] = (int *)calloc(C, sizeof(int));</code><br><br><b>해제 순서 (반드시 역순!):</b><br><code>for (i = 0; i &lt; R; i++) free(mat[i]);</code> &larr; 각 행 먼저<br><code>free(mat);</code> &larr; 행 포인터 배열 마지막<br><br><b>주의:</b> <code>free(mat)</code>을 먼저 하면 행 포인터를 잃어 메모리 누수 발생!<br><br>Hint: <code>mat[i][j]</code>로 접근 — 정적 2D 배열과 문법이 동일합니다.",
    "cases": [
      {
        "expected": "Row 0: 6\nRow 1: 15\nTotal: 21\n",
        "input": "2 3\n1 2 3\n4 5 6\n",
        "id": 1,
        "pts": 25
      },
      {
        "input": "1 1\n42\n",
        "pts": 25,
        "id": 2,
        "expected": "Row 0: 42\nTotal: 42\n"
      },
      {
        "expected": "Row 0: 2\nRow 1: 4\nRow 2: 6\nTotal: 12\n",
        "input": "3 2\n1 1\n2 2\n3 3\n",
        "id": 3,
        "pts": 25
      },
      {
        "input": "2 4\n10 20 30 40\n-10 -20 -30 -40\n",
        "id": 4,
        "pts": 25,
        "expected": "Row 0: 100\nRow 1: -100\nTotal: 0\n"
      }
    ],
    "deadline": "2026-06-04T23:59",
    "createdAt": "2026-05-28T00:00"
  },
  {
    "id": "dr6",
    "ex_in": "apple\nbanana\ncherry\nquit",
    "week": "Week 13B: Dynamic Memory – Part B",
    "input_desc": "한 줄에 단어 하나씩 (공백 없음, 최대 99자).<br><code>quit</code>이 나오면 종료.",
    "ex_out": "cherry\nbanana\napple\nCount: 3",
    "output_desc": "저장된 단어를 <b>입력 역순</b>으로 한 줄에 하나씩 출력.<br>마지막에 <code>Count: (개수)</code>",
    "title": "Word Collector",
    "desc": "단어를 한 줄에 하나씩 입력받아 동적으로 저장하다가 <code>quit</code>이 입력되면 멈추시오. 저장된 단어를 <b>역순</b>으로 출력하고 총 개수를 출력하시오.<br><br><b>이 문제가 연습하는 것:</b> <code>char **</code> (문자열 포인터 배열)을 <code>realloc</code>으로 키우기 + 각 문자열을 개별 <code>malloc</code>으로 복사하기.<br><br><b>구현 순서:</b><ol><li>초기: <code>cap = 4</code>, <code>size = 0</code>, <code>char **words = malloc(cap * sizeof(char *));</code></li><li>단어를 읽어서 <code>\"quit\"</code>이면 중단</li><li><code>size == cap</code>이면 <code>cap *= 2</code>하고 words를 <code>realloc</code></li><li><code>words[size] = malloc(strlen(word) + 1);</code>로 문자열 복사 공간 할당</li><li><code>strcpy(words[size], word); size++;</code></li><li>역순 출력 후 <b>모든 메모리 해제:</b><br>각 <code>words[i]</code>를 <code>free</code> → 마지막에 <code>free(words)</code></li></ol>Hint: <code>char buf[100]; scanf(\"%s\", buf);</code>로 읽고, 길이만큼만 malloc하여 복사합니다.<br><code>quit</code>은 저장하지 않습니다.",
    "cases": [
      {
        "expected": "cherry\nbanana\napple\nCount: 3\n",
        "input": "apple\nbanana\ncherry\nquit\n",
        "id": 1,
        "pts": 25
      },
      {
        "input": "hello\nquit\n",
        "pts": 25,
        "id": 2,
        "expected": "hello\nCount: 1\n"
      },
      {
        "id": 3,
        "pts": 25,
        "input": "a\nb\nc\nd\ne\nquit\n",
        "expected": "e\nd\nc\nb\na\nCount: 5\n"
      },
      {
        "id": 4,
        "pts": 25,
        "input": "programming\nis\nfun\nwith\ndynamic\nmemory\nquit\n",
        "expected": "memory\ndynamic\nwith\nfun\nis\nprogramming\nCount: 6\n"
      }
    ],
    "deadline": "2026-06-04T23:59",
    "createdAt": "2026-05-28T00:00"
  },
  {
    "id": "dm1",
    "deadline": "2026-06-01T23:59",
    "week": "Week 13A: Dynamic Memory – Part A",
    "cases": [
      {
        "pts": 25,
        "expected": "0 1 2 3 4\n",
        "input": "5\n",
        "id": 1
      },
      {
        "input": "1\n",
        "pts": 25,
        "expected": "0\n",
        "id": 2
      },
      {
        "pts": 25,
        "input": "3\n",
        "expected": "0 1 2\n",
        "id": 3
      },
      {
        "id": 4,
        "expected": "0 1 2 3 4 5 6 7 8 9\n",
        "input": "10\n",
        "pts": 25
      }
    ],
    "title": "Allocate and Fill (Warm-up)",
    "ex_out": "0 1 2 3 4",
    "ex_in": "5",
    "createdAt": "2026-05-26T00:00",
    "output_desc": "0부터 N-1까지의 정수를 공백으로 구분하여 한 줄에 출력. <b>마지막 숫자 뒤에 공백 없음.</b><br>예: N=5 → <code>0 1 2 3 4</code><br>예: N=1 → <code>0</code>",
    "desc": "정수 N을 입력받아 <code>malloc</code>으로 크기 N의 int 배열을 할당하고, 0부터 N-1까지 차례대로 채운 뒤 한 줄에 공백으로 구분하여 출력하시오.<br>이 문제는 <b>malloc → 채우기 → 출력 → free</b>의 기본 흐름을 연습하는 워밍업입니다.<br>Hint: <code>int *arr = (int *)malloc(n * sizeof(int));</code> — 사용 후 반드시 <code>free(arr);</code>",
    "input_desc": "첫째 줄에 정수 N (1 이상 100 이하)."
  },
  {
    "id": "dm2",
    "input_desc": "첫째 줄에 N과 K가 공백으로 구분되어 주어진다 (1 ≤ N ≤ 100, -100 ≤ K ≤ 100).<br>다음 N줄에 정수 하나씩.",
    "output_desc": "각 원소에 K를 곱한 값을 공백으로 구분하여 한 줄에 출력. <b>마지막 숫자 뒤에 공백 없음.</b><br>예: N=4, K=3, [1 2 3 4] → <code>3 6 9 12</code>",
    "desc": "정수 N과 배수 K를 입력받고, N개의 정수를 동적 배열에 저장한 뒤 각 원소에 K를 곱한 결과를 한 줄에 출력하시오.<br><code>malloc</code>으로 크기 N의 int 배열을 할당하시오.<br>Hint: 배열을 채운 뒤 다시 순회하며 <code>arr[i] * k</code>를 출력.",
    "title": "Scale Array",
    "ex_out": "3 6 9 12",
    "ex_in": "4 3\n1\n2\n3\n4",
    "createdAt": "2026-05-26T00:00",
    "cases": [
      {
        "pts": 25,
        "input": "4 3\n1\n2\n3\n4\n",
        "expected": "3 6 9 12\n",
        "id": 1
      },
      {
        "pts": 25,
        "input": "1 5\n7\n",
        "expected": "35\n",
        "id": 2
      },
      {
        "id": 3,
        "expected": "0 0 0\n",
        "input": "3 0\n10\n20\n30\n",
        "pts": 25
      },
      {
        "id": 4,
        "pts": 25,
        "expected": "-2 4 -6\n",
        "input": "3 -2\n1\n-2\n3\n"
      }
    ],
    "week": "Week 13A: Dynamic Memory – Part A",
    "deadline": "2026-06-01T23:59"
  },
  {
    "id": "dm3",
    "output_desc": "<code>Sum: (합계)</code><br><code>Avg: (평균)</code> (소수점 둘째 자리)<br>예: [10 20 30 40] → <code>Sum: 100</code> / <code>Avg: 25.00</code>",
    "desc": "N개의 정수를 동적 배열에 저장하고 합계와 평균을 출력하시오.<br><code>malloc</code>으로 정확히 N개 크기의 int 배열을 할당하시오.<br>Hint: <code>int *arr = (int *)malloc(n * sizeof(int));</code> — 사용 후 반드시 <code>free(arr);</code>",
    "input_desc": "첫째 줄에 N (1 이상 100 이하).<br>다음 N줄에 정수 하나씩.",
    "title": "Dynamic Sum and Average",
    "createdAt": "2026-05-26T00:00",
    "ex_out": "Sum: 100\nAvg: 25.00",
    "ex_in": "4\n10\n20\n30\n40",
    "week": "Week 13A: Dynamic Memory – Part A",
    "cases": [
      {
        "pts": 25,
        "expected": "Sum: 100\nAvg: 25.00\n",
        "input": "4\n10\n20\n30\n40\n",
        "id": 1
      },
      {
        "expected": "Sum: 15\nAvg: 5.00\n",
        "input": "3\n7\n3\n5\n",
        "pts": 25,
        "id": 2
      },
      {
        "id": 3,
        "pts": 25,
        "expected": "Sum: 42\nAvg: 42.00\n",
        "input": "1\n42\n"
      },
      {
        "id": 4,
        "pts": 25,
        "expected": "Sum: -30\nAvg: -6.00\n",
        "input": "5\n-10\n20\n-30\n40\n-50\n"
      }
    ],
    "deadline": "2026-06-01T23:59"
  },
  {
    "id": "dm4",
    "input_desc": "첫째 줄에 N (1 이상 100 이하).<br>다음 N줄에 정수 하나씩 (-1000 ≤ 값 ≤ 1000).",
    "output_desc": "<code>Min: (최솟값)</code><br><code>Max: (최댓값)</code><br>예: [3 1 4 1 5] → <code>Min: 1</code> / <code>Max: 5</code>",
    "desc": "N개의 정수를 동적 배열에 저장하고 최솟값과 최댓값을 출력하시오.<br><code>malloc</code>으로 배열을 할당하고, 반복문으로 min/max를 찾으시오.<br><b>주의:</b> min/max의 초기값은 0이 아니라 <b>첫 번째 원소</b>로 설정해야 한다 (음수 입력 고려).",
    "title": "Dynamic Min and Max",
    "createdAt": "2026-05-26T00:00",
    "ex_out": "Min: 1\nMax: 5",
    "ex_in": "5\n3\n1\n4\n1\n5",
    "cases": [
      {
        "expected": "Min: 1\nMax: 5\n",
        "input": "5\n3\n1\n4\n1\n5\n",
        "pts": 25,
        "id": 1
      },
      {
        "input": "3\n-5\n0\n5\n",
        "pts": 25,
        "expected": "Min: -5\nMax: 5\n",
        "id": 2
      },
      {
        "expected": "Min: 99\nMax: 99\n",
        "pts": 25,
        "input": "1\n99\n",
        "id": 3
      },
      {
        "id": 4,
        "pts": 25,
        "expected": "Min: 10\nMax: 10\n",
        "input": "4\n10\n10\n10\n10\n"
      }
    ],
    "week": "Week 13A: Dynamic Memory – Part A",
    "deadline": "2026-06-01T23:59"
  },
  {
    "id": "dm5",
    "deadline": "2026-06-01T23:59",
    "cases": [
      {
        "id": 1,
        "pts": 25,
        "input": "4\n10\n20\n30\n40\n",
        "expected": "Average: 25.00\nAbove: 2\n"
      },
      {
        "id": 2,
        "pts": 25,
        "expected": "Average: 10.00\nAbove: 0\n",
        "input": "5\n10\n10\n10\n10\n10\n"
      },
      {
        "expected": "Average: 4.00\nAbove: 1\n",
        "pts": 25,
        "input": "3\n1\n2\n9\n",
        "id": 3
      },
      {
        "input": "6\n5\n5\n5\n5\n5\n20\n",
        "expected": "Average: 7.50\nAbove: 1\n",
        "pts": 25,
        "id": 4
      }
    ],
    "week": "Week 13A: Dynamic Memory – Part A",
    "ex_out": "Average: 25.00\nAbove: 2",
    "ex_in": "4\n10\n20\n30\n40",
    "createdAt": "2026-05-26T00:00",
    "title": "Above Average Count",
    "input_desc": "첫째 줄에 N (1 이상 100 이하).<br>다음 N줄에 정수 하나씩.",
    "desc": "N개의 정수를 동적 배열에 저장하고, 평균을 구한 뒤 <b>평균보다 큰(초과)</b> 원소가 몇 개인지 세시오.<br><code>malloc</code>으로 배열을 할당하고, 먼저 전체 평균을 구한 다음 다시 순회하며 개수를 세시오.<br>Hint: 평균은 실수(<code>double</code>)로 계산하고, <code>arr[i] &gt; avg</code> (초과, 등호 없음) 로 비교.",
    "output_desc": "<code>Average: (평균)</code> (소수점 둘째 자리)<br><code>Above: (평균 초과 원소 개수)</code><br>예: [10 20 30 40] 평균 25.00 → <code>Average: 25.00</code> / <code>Above: 2</code> (30, 40)"
  },
  {
    "id": "dm6",
    "input_desc": "한 줄에 문자열 하나 (공백 없음, 최대 99자).",
    "desc": "문자열을 입력받아 <code>malloc</code>으로 복사본을 만들고 원본과 복사본의 내용 및 길이를 출력하시오.<br>Hint: <code>malloc(strlen(s) + 1)</code> — null terminator를 위한 <b>+1</b>을 잊지 마세요. <code>strcpy</code>로 복사.",
    "output_desc": "<code>Original: (문자열)</code><br><code>Copy: (문자열)</code><br><code>Length: (길이)</code><br>예: <code>Hello</code> → <code>Original: Hello</code> / <code>Copy: Hello</code> / <code>Length: 5</code>",
    "createdAt": "2026-05-26T00:00",
    "ex_in": "Hello",
    "ex_out": "Original: Hello\nCopy: Hello\nLength: 5",
    "title": "Dynamic String Duplicate",
    "cases": [
      {
        "id": 1,
        "input": "Hello\n",
        "expected": "Original: Hello\nCopy: Hello\nLength: 5\n",
        "pts": 25
      },
      {
        "expected": "Original: C\nCopy: C\nLength: 1\n",
        "input": "C\n",
        "pts": 25,
        "id": 2
      },
      {
        "pts": 25,
        "input": "DynamicMemory\n",
        "expected": "Original: DynamicMemory\nCopy: DynamicMemory\nLength: 13\n",
        "id": 3
      },
      {
        "id": 4,
        "pts": 25,
        "input": "test1234\n",
        "expected": "Original: test1234\nCopy: test1234\nLength: 8\n"
      }
    ],
    "week": "Week 13A: Dynamic Memory – Part A",
    "deadline": "2026-06-01T23:59"
  },
  {
    "id": "dm7",
    "input_desc": "첫째 줄에 N (1 이상 1000 이하).<br>다음 N줄에 정수 하나씩 (0~99).",
    "output_desc": "등장한 숫자를 오름차순으로 <code>숫자: 횟수</code> 형태로 출력.<br>예: [3 1 4 1 5 9 3] → <code>1: 2</code> / <code>3: 2</code> / <code>4: 1</code> / <code>5: 1</code> / <code>9: 1</code>",
    "desc": "N개의 정수(0 이상 99 이하)를 입력받아, 각 숫자가 몇 번 등장했는지 출력하시오. 등장 횟수가 0인 숫자는 출력하지 않습니다.<br><code>calloc</code>으로 크기 100의 카운터 배열을 만드시오. 입력값(0~99)을 그대로 배열 인덱스로 사용하므로 크기가 100입니다.<br>Hint: <code>int *cnt = (int *)calloc(100, sizeof(int));</code> — calloc은 자동으로 0으로 초기화하므로 따로 0을 넣을 필요가 없습니다.",
    "title": "Frequency Counter",
    "ex_out": "1: 2\n3: 2\n4: 1\n5: 1\n9: 1",
    "ex_in": "7\n3\n1\n4\n1\n5\n9\n3",
    "createdAt": "2026-05-26T00:00",
    "cases": [
      {
        "id": 1,
        "expected": "1: 2\n3: 2\n4: 1\n5: 1\n9: 1\n",
        "input": "7\n3\n1\n4\n1\n5\n9\n3\n",
        "pts": 25
      },
      {
        "id": 2,
        "expected": "0: 5\n",
        "pts": 25,
        "input": "5\n0\n0\n0\n0\n0\n"
      },
      {
        "pts": 25,
        "input": "3\n99\n50\n0\n",
        "expected": "0: 1\n50: 1\n99: 1\n",
        "id": 3
      },
      {
        "id": 4,
        "expected": "10: 3\n20: 2\n30: 1\n",
        "pts": 25,
        "input": "6\n10\n20\n10\n20\n10\n30\n"
      }
    ],
    "week": "Week 13A: Dynamic Memory – Part A",
    "deadline": "2026-06-01T23:59"
  },
  {
    "id": "u1",
    "input_desc": "첫째 줄에 명령 수 N (1 이상 100 이하).<br>다음 N줄에 방향 번호 (0=NORTH, 1=EAST, 2=SOUTH, 3=WEST).<br>로봇의 초기 위치는 (0, 0), 초기 이동 횟수는 0이다.",
    "deadline": "2026-05-27T23:59",
    "createdAt": "2026-05-22T00:00",
    "output_desc": "최종 위치와 이동 횟수를 한 줄에 출력: <code>x y steps</code>",
    "ex_out": "2 0 4",
    "cases": [
      {
        "input": "4\n0\n1\n1\n2\n",
        "id": 1,
        "pts": 25,
        "expected": "2 0 4\n"
      },
      {
        "input": "5\n3\n3\n0\n0\n0\n",
        "id": 2,
        "pts": 25,
        "expected": "-2 3 5\n"
      },
      {
        "pts": 25,
        "expected": "1 1 6\n",
        "input": "6\n0\n1\n2\n3\n0\n1\n",
        "id": 3
      },
      {
        "expected": "-1 -2 3\n",
        "pts": 25,
        "id": 4,
        "input": "3\n2\n2\n3\n"
      }
    ],
    "ex_in": "4\n0\n1\n1\n2",
    "title": "Robot Navigator",
    "week": "Week 12B: Structs – Part B",
    "desc": "N개의 방향 명령을 받아 로봇을 이동시키고 최종 위치와 이동 횟수를 출력하시오.<br><code>typedef enum { NORTH=0, EAST, SOUTH, WEST } Direction;</code>과 위치·이동 횟수를 담는 <code>typedef struct { int x; int y; int steps; } Robot;</code>를 정의하시오.<br>함수 <code>void advance(Robot *r, Direction d)</code>를 작성하시오: steps를 1 증가시킨 뒤, <code>switch(d)</code>로 방향에 따라 x 또는 y를 갱신합니다. (NORTH: y+1, EAST: x+1, SOUTH: y-1, WEST: x-1)<br>Hint: switch의 case 레이블에 enum 상수를 쓰면 0/1/2/3보다 훨씬 읽기 쉽습니다."
  },
  {
    "id": "u2",
    "ex_out": "GREEN\nYELLOW\nRED",
    "input_desc": "한 줄에 초기 상태(0=RED, 1=YELLOW, 2=GREEN)와 N.",
    "deadline": "2026-05-27T23:59",
    "createdAt": "2026-05-22T00:00",
    "output_desc": "N줄에 advance() 호출 후의 상태 이름을 출력.",
    "desc": "신호등 유한 상태 머신(FSM)을 구현하시오.<br><code>typedef enum { RED, YELLOW, GREEN } LightState;</code>와 현재 상태·전이 횟수를 담는 <code>TrafficLight</code> struct를 정의하시오.<br>함수 <code>void advance(TrafficLight *tl)</code>를 작성하시오: 전이 횟수를 1 증가시킨 뒤, 현재 상태에 따라 다음 상태로 전이합니다.<br>전이 규칙: RED → GREEN → YELLOW → RED (순환).<br>Hint: enum 값을 문자열로 변환할 때 문자열 배열을 인덱스로 조회하면 편리합니다 (강의 슬라이드 참고).",
    "week": "Week 12B: Structs – Part B",
    "ex_in": "0 3",
    "title": "Traffic Light FSM",
    "cases": [
      {
        "expected": "GREEN\nYELLOW\nRED\n",
        "pts": 25,
        "id": 1,
        "input": "0 3\n"
      },
      {
        "input": "1 3\n",
        "id": 2,
        "pts": 25,
        "expected": "RED\nGREEN\nYELLOW\n"
      },
      {
        "pts": 25,
        "expected": "YELLOW\nRED\nGREEN\nYELLOW\n",
        "input": "2 4\n",
        "id": 3
      },
      {
        "id": 4,
        "input": "0 6\n",
        "expected": "GREEN\nYELLOW\nRED\nGREEN\nYELLOW\nRED\n",
        "pts": 25
      }
    ]
  },
  {
    "id": "u3",
    "week": "Week 12B: Structs – Part B",
    "desc": "N개의 값을 배열에 저장한 뒤, M개의 인덱스 쿼리에 답하시오.<br><code>typedef enum { TYPE_INT, TYPE_DOUBLE } VType;</code>와 내부에 <code>union { int i; double d; } data;</code>를 갖는 <code>Value</code> struct를 정의하시오.<br>저장 시점에 <code>arr[i].type</code>과 해당 union 멤버에 값을 기록하시오.<br>쿼리 시점에는 인덱스만 주어지므로, <code>arr[idx].type</code>을 확인해야만 어떤 멤버를 읽을지 알 수 있습니다.",
    "cases": [
      {
        "id": 1,
        "input": "4\ni 42\nd 3.14\ni -5\nd 1.00\n3\n2\n0\n3\n",
        "expected": "INT: -5\nINT: 42\nDOUBLE: 1.00\n",
        "pts": 25
      },
      {
        "pts": 25,
        "expected": "INT: 10\nDOUBLE: 0.50\n",
        "input": "3\nd 0.50\ni 10\nd 2.75\n2\n1\n0\n",
        "id": 2
      },
      {
        "pts": 25,
        "expected": "DOUBLE: 5.00\nDOUBLE: 3.14\nINT: 1\nINT: 4\n",
        "input": "5\ni 1\ni 2\nd 3.14\ni 4\nd 5.00\n4\n4\n2\n0\n3\n",
        "id": 3
      },
      {
        "pts": 25,
        "expected": "DOUBLE: 99.99\nINT: -7\nDOUBLE: 99.99\n",
        "input": "2\nd 99.99\ni -7\n3\n0\n1\n0\n",
        "id": 4
      }
    ],
    "title": "Type Store",
    "ex_in": "4\ni 42\nd 3.14\ni -5\nd 1.00\n3\n2\n0\n3",
    "ex_out": "INT: -5\nINT: 42\nDOUBLE: 1.00",
    "createdAt": "2026-05-22T00:00",
    "output_desc": "M줄에 걸쳐 출력. <code>INT: 값</code> 또는 <code>DOUBLE: 값</code>. double은 <code>%.2f</code>.",
    "input_desc": "첫째 줄에 N (1 이상 100 이하).<br>다음 N줄에 타입(<code>i</code>=int, <code>d</code>=double)과 값 (0번부터 순서대로 저장).<br>다음 줄에 쿼리 수 M.<br>다음 M줄에 조회할 인덱스 (0 이상 N-1 이하).",
    "deadline": "2026-05-27T23:59"
  },
  {
    "id": "u4",
    "ex_in": "4\n0 25\n1 1013\n0 30\n1 1010",
    "title": "Sensor Category Stats",
    "cases": [
      {
        "expected": "TEMP: count=2 min=25 max=30\nPRESSURE: count=2 min=1010 max=1013\n",
        "pts": 25,
        "id": 1,
        "input": "4\n0 25\n1 1013\n0 30\n1 1010\n"
      },
      {
        "pts": 25,
        "expected": "TEMP: count=3 min=20 max=35\nPRESSURE: count=0 min=N/A max=N/A\n",
        "input": "3\n0 20\n0 35\n0 28\n",
        "id": 2
      },
      {
        "expected": "TEMP: count=0 min=N/A max=N/A\nPRESSURE: count=1 min=1000 max=1000\n",
        "pts": 25,
        "id": 3,
        "input": "1\n1 1000\n"
      },
      {
        "expected": "TEMP: count=3 min=15 max=22\nPRESSURE: count=3 min=1005 max=1020\n",
        "pts": 25,
        "id": 4,
        "input": "6\n0 15\n1 1020\n0 22\n1 1005\n0 18\n1 1015\n"
      }
    ],
    "desc": "N개의 센서 데이터를 종류별로 분류하여 최솟값·최댓값·개수를 출력하시오.<br><code>typedef enum { TEMP=0, PRESSURE=1 } SensorType;</code>과 <code>Sensor</code> struct(type, value)를 정의하시오.<br>TEMP와 PRESSURE 각각의 최솟값·최댓값·개수를 별도 변수로 관리하고, 첫 데이터가 들어올 때 min = max = value로 초기화하시오.<br>해당 종류의 데이터가 없으면 <code>min=N/A max=N/A</code>를 출력하시오.",
    "week": "Week 12B: Structs – Part B",
    "deadline": "2026-05-27T23:59",
    "input_desc": "첫째 줄에 N.<br>다음 N줄에 type(0=온도, 1=압력)과 value(정수).",
    "output_desc": "<code>TEMP: count=X min=Y max=Z</code><br><code>PRESSURE: count=X min=Y max=Z</code><br>데이터 없으면 <code>min=N/A max=N/A</code>.",
    "createdAt": "2026-05-22T00:00",
    "ex_out": "TEMP: count=2 min=25 max=30\nPRESSURE: count=2 min=1010 max=1013"
  },
  {
    "id": "uc1",
    "ex_out": "41 00 00 00",
    "output_desc": "b[0]~b[3]을 두 자리 대문자 16진수, 공백 구분 출력. (<code>%02X</code>)",
    "createdAt": "2026-05-22T00:00",
    "deadline": "2026-05-27T23:59",
    "input_desc": "한 줄에 부호 없는 정수 N (0 이상 2³²-1 이하).",
    "week": "Week 12B: Structs – Part B",
    "desc": "부호 없는 정수를 union으로 4바이트로 분해하여 16진수로 출력하시오.<br><code>typedef union { unsigned int i; unsigned char b[4]; } Word;</code>를 정의하시오.<br><code>w.i</code>에 값을 쓰면 같은 메모리를 <code>w.b[0]~w.b[3]</code>으로 바이트 단위로 읽을 수 있다.<br>Hint: <code>b[0]</code>이 최하위 바이트(LSB). 예) 65 = 0x41이면 b[0]=0x41, 나머지 b[1]~b[3]=0x00.",
    "cases": [
      {
        "pts": 25,
        "expected": "41 00 00 00\n",
        "input": "65\n",
        "id": 1
      },
      {
        "input": "0\n",
        "id": 2,
        "pts": 25,
        "expected": "00 00 00 00\n"
      },
      {
        "pts": 25,
        "expected": "00 01 00 00\n",
        "input": "256\n",
        "id": 3
      },
      {
        "pts": 25,
        "expected": "78 56 34 12\n",
        "input": "305419896\n",
        "id": 4
      }
    ],
    "ex_in": "65",
    "title": "Union Byte Inspector"
  },
  {
    "id": "uc2",
    "ex_out": "0x01",
    "input_desc": "한 줄에 ready(0 또는 1), err(0 또는 1), mode(0~7).",
    "deadline": "2026-05-27T23:59",
    "createdAt": "2026-05-22T00:00",
    "output_desc": "최종 레지스터 값을 <code>0x%02X</code> 형식으로 출력.",
    "week": "Week 12B: Structs – Part B",
    "desc": "비트 필드 struct와 union으로 레지스터 값을 설정하고 출력하시오.<br><code>unsigned char ready:1; err:1; mode:3; reserved:3;</code> 멤버를 갖는 <code>StatusBits</code> struct와 <code>unsigned char reg</code>를 공유하는 union <code>StatusReg</code>를 정의하시오.<br><code>s.reg = 0;</code>으로 초기화 후 각 bits 멤버에 입력값을 대입하고, <code>s.reg</code>를 출력하시오.<br>Hint: bit 위치 — ready=bit0, err=bit1, mode=bits2~4. ready=1,err=1,mode=5 → 1+2+20 = 0x17.",
    "cases": [
      {
        "pts": 25,
        "expected": "0x01\n",
        "input": "1 0 0\n",
        "id": 1
      },
      {
        "expected": "0x17\n",
        "pts": 25,
        "id": 2,
        "input": "1 1 5\n"
      },
      {
        "input": "0 0 7\n",
        "id": 3,
        "pts": 25,
        "expected": "0x1C\n"
      },
      {
        "input": "1 1 0\n",
        "id": 4,
        "pts": 25,
        "expected": "0x03\n"
      }
    ],
    "ex_in": "1 0 0",
    "title": "Bit Field Register"
  },
  {
    "id": "uc3",
    "deadline": "2026-05-27T23:59",
    "input_desc": "첫째 줄에 N.<br>다음 N줄에 day(1~7) hour minute event(공백 없음).",
    "output_desc": "정렬된 순서로 출력. u1과 동일하게 주말은 <code>[Weekend]</code> 접두어.",
    "createdAt": "2026-05-22T00:00",
    "ex_out": "Mon 09:00 Class\nFri 17:00 Gym\n[Weekend] Sat 14:00 Meeting",
    "title": "Appointment Sorter",
    "ex_in": "3\n5 17 0 Gym\n1 9 0 Class\n6 14 0 Meeting",
    "cases": [
      {
        "expected": "Mon 09:00 Class\nFri 17:00 Gym\n[Weekend] Sat 14:00 Meeting\n",
        "pts": 25,
        "id": 1,
        "input": "3\n5 17 0 Gym\n1 9 0 Class\n6 14 0 Meeting\n"
      },
      {
        "id": 2,
        "input": "4\n7 10 0 Brunch\n2 8 0 Standup\n5 16 0 Review\n2 14 0 Lunch\n",
        "expected": "Tue 08:00 Standup\nTue 14:00 Lunch\nFri 16:00 Review\n[Weekend] Sun 10:00 Brunch\n",
        "pts": 25
      },
      {
        "pts": 25,
        "expected": "Mon 09:45 C\nMon 15:00 A\nMon 15:30 B\n",
        "input": "3\n1 15 30 B\n1 15 0 A\n1 9 45 C\n",
        "id": 3
      },
      {
        "expected": "Thu 12:00 DocReview\n[Weekend] Sat 20:00 Party\n[Weekend] Sun 10:00 Brunch\n",
        "pts": 25,
        "id": 4,
        "input": "3\n6 20 0 Party\n4 12 0 DocReview\n7 10 0 Brunch\n"
      }
    ],
    "desc": "N개의 약속을 요일 오름차순으로, 같은 요일이면 시간 오름차순(hour → minute)으로 정렬하여 출력하시오.<br><code>typedef enum { MON=1, TUE, WED, THU, FRI, SAT, SUN } Weekday;</code>와 <code>typedef struct { Weekday day; int hour; int minute; char event[50]; } Appointment;</code>를 정의하시오. 요일 번호에 대응하는 이름 문자열 배열을 만들어 출력에 활용하시오.<br>Bubble sort로 정렬하시오. 여러 필드를 비교할 때 우선순위를 어떻게 하나의 비교 조건으로 만들지 생각해 보세요.<br>Hint: 구조체 배열 정렬은 12A에서 배운 것과 동일합니다 — 구조체를 통째로 swap합니다.",
    "week": "Week 12B: Structs – Part B"
  },
  {
    "id": "st1",
    "cases": [
      {
        "input": "Alice\n20260001\n3.85\n",
        "expected": "Name: Alice\nID:   20260001\nGPA:  3.85\n",
        "pts": 25,
        "id": 1
      },
      {
        "pts": 25,
        "expected": "Name: Bob\nID:   20260042\nGPA:  2.70\n",
        "input": "Bob\n20260042\n2.70\n",
        "id": 2
      },
      {
        "id": 3,
        "pts": 25,
        "expected": "Name: Charlie\nID:   20261234\nGPA:  4.00\n",
        "input": "Charlie\n20261234\n4.00\n"
      },
      {
        "input": "Dave\n20260100\n1.00\n",
        "expected": "Name: Dave\nID:   20260100\nGPA:  1.00\n",
        "pts": 25,
        "id": 4
      }
    ],
    "deadline": "2026-05-25T23:59",
    "input_desc": "세 줄 — 이름(공백없음), 학번(정수), 학점(실수).",
    "ex_out": "Name: Alice\nID:   20260001\nGPA:  3.85",
    "desc": "학생 정보를 구조체로 표현하고 출력하시오.<br><code>typedef struct { char name[50]; int id; double gpa; } Student;</code>를 정의하시오.<br>Hint: <code>scanf(\"%s\", s.name)</code> — char 배열은 & 없이. double 입력은 <code>%lf</code>.",
    "ex_in": "Alice\n20260001\n3.85",
    "output_desc": "<code>Name: 이름</code><br><code>ID:   학번</code><br><code>GPA:  학점</code> (소수점 둘째 자리)",
    "week": "Week 12A: Structs – Part A",
    "title": "Print Student Card"
  },
  {
    "id": "st2",
    "cases": [
      {
        "expected": "Area: 12\nPerimeter: 14\n",
        "pts": 25,
        "input": "3 4\n",
        "id": 1
      },
      {
        "expected": "Area: 35\nPerimeter: 24\n",
        "pts": 25,
        "input": "7 5\n",
        "id": 2
      },
      {
        "id": 3,
        "pts": 25,
        "expected": "Area: 80\nPerimeter: 36\n",
        "input": "10 8\n"
      },
      {
        "input": "1 15\n",
        "pts": 25,
        "expected": "Area: 15\nPerimeter: 32\n",
        "id": 4
      }
    ],
    "deadline": "2026-05-25T23:59",
    "input_desc": "한 줄에 가로(w)와 세로(h) (1 이상 1000 이하 정수).",
    "ex_out": "Area: 12\nPerimeter: 14",
    "desc": "직사각형의 가로·세로를 구조체로 표현하고 넓이와 둘레를 출력하시오.<br><code>typedef struct { int w; int h; } Rect;</code>를 정의하고 <code>int area(Rect r)</code>, <code>int perimeter(Rect r)</code> 함수를 작성하시오.<br>함수가 <code>Rect r</code>(값)을 받으므로 호출 시 & 없이 넘깁니다.",
    "ex_in": "3 4",
    "output_desc": "<code>Area: (넓이)</code><br><code>Perimeter: (둘레)</code>",
    "week": "Week 12A: Structs – Part A",
    "title": "Rectangle Area and Perimeter"
  },
  {
    "id": "st3",
    "desc": "학생 이름·현재점수·보너스를 입력받아 포인터로 점수를 갱신하고 출력하시오. 최종 점수가 100을 넘으면 100으로 제한합니다.<br>함수 원형: <code>void add_bonus(Student *s, int bonus)</code><br>Hint: <code>s-&gt;score += bonus;</code> — 포인터 매개변수는 <code>-&gt;</code>로 접근. 호출 시 <code>add_bonus(&amp;stu, bonus)</code>.",
    "week": "Week 12A: Structs – Part A",
    "output_desc": "<code>Updated: 이름 gets 최종점수</code>",
    "ex_in": "Alice 85 10",
    "cases": [
      {
        "expected": "Updated: Alice gets 95\n",
        "pts": 25,
        "input": "Alice 85 10\n",
        "id": 1
      },
      {
        "id": 2,
        "expected": "Updated: Bob gets 100\n",
        "pts": 25,
        "input": "Bob 95 10\n"
      },
      {
        "id": 3,
        "pts": 25,
        "expected": "Updated: Carol gets 55\n",
        "input": "Carol 60 -5\n"
      },
      {
        "id": 4,
        "pts": 25,
        "expected": "Updated: Dave gets 100\n",
        "input": "Dave 50 50\n"
      }
    ],
    "deadline": "2026-05-25T23:59",
    "ex_out": "Updated: Alice gets 95",
    "input_desc": "한 줄에 이름(공백없음) 현재점수(정수) 보너스(정수).",
    "title": "Update Score via Pointer"
  },
  {
    "id": "st4",
    "deadline": "2026-05-25T23:59",
    "cases": [
      {
        "id": 1,
        "input": "3\nAlice 85\nBob 92\nCarol 78\n",
        "pts": 25,
        "expected": "Bob 92\nAlice 85\nCarol 78\n"
      },
      {
        "pts": 25,
        "expected": "Dave 95\nGrace 90\nEve 88\nFrank 72\n",
        "input": "4\nDave 95\nEve 88\nFrank 72\nGrace 90\n",
        "id": 2
      },
      {
        "input": "1\nSolo 100\n",
        "pts": 25,
        "expected": "Solo 100\n",
        "id": 3
      },
      {
        "expected": "B 90\nD 80\nC 70\nE 60\nA 50\n",
        "pts": 25,
        "input": "5\nA 50\nB 90\nC 70\nD 80\nE 60\n",
        "id": 4
      }
    ],
    "ex_out": "Bob 92\nAlice 85\nCarol 78",
    "input_desc": "첫째 줄에 N (1 이상 100 이하). 다음 N줄에 이름(공백없음)과 점수(정수).",
    "desc": "N명의 학생 이름과 점수를 입력받아 점수 내림차순으로 정렬하여 출력하시오.<br><code>typedef struct { char name[30]; int score; } Student;</code>를 정의하고 bubble sort로 정렬하시오.<br>Hint: 구조체 통째로 swap — <code>Student tmp = arr[j]; arr[j] = arr[j+1]; arr[j+1] = tmp;</code>",
    "week": "Week 12A: Structs – Part A",
    "ex_in": "3\nAlice 85\nBob 92\nCarol 78",
    "output_desc": "점수 내림차순으로 이름과 점수를 한 줄씩 출력.",
    "title": "Sort Students by Score"
  },
  {
    "id": "stc1",
    "week": "Week 12A: Structs – Part A",
    "ex_in": "0 0 3 4",
    "output_desc": "<code>Midpoint: (X.XX, Y.XX)</code><br><code>Distance: D.XX</code>",
    "desc": "두 점의 좌표를 입력받아 중점과 유클리드 거리를 출력하시오.<br><code>typedef struct { double x; double y; } Point;</code>를 정의하고 <code>Point midpoint(Point a, Point b)</code>, <code>double distance(Point a, Point b)</code>를 작성하시오.<br>Hint: <code>#include &lt;math.h&gt;</code> 필요. <code>sqrt(dx*dx + dy*dy)</code>. 함수에서 struct를 값으로 반환 가능.",
    "ex_out": "Midpoint: (1.50, 2.00)\nDistance: 5.00",
    "input_desc": "한 줄에 x1 y1 x2 y2 (실수 또는 정수, 공백 구분).",
    "cases": [
      {
        "id": 1,
        "input": "0 0 3 4\n",
        "pts": 25,
        "expected": "Midpoint: (1.50, 2.00)\nDistance: 5.00\n"
      },
      {
        "id": 2,
        "expected": "Midpoint: (2.50, 3.00)\nDistance: 5.00\n",
        "pts": 25,
        "input": "1 1 4 5\n"
      },
      {
        "id": 3,
        "input": "0 0 1 0\n",
        "expected": "Midpoint: (0.50, 0.00)\nDistance: 1.00\n",
        "pts": 25
      },
      {
        "input": "-1 -1 1 1\n",
        "pts": 25,
        "expected": "Midpoint: (0.00, 0.00)\nDistance: 2.83\n",
        "id": 4
      }
    ],
    "deadline": "2026-05-25T23:59",
    "title": "Point Distance and Midpoint"
  },
  {
    "id": "stc2",
    "input_desc": "첫째 줄에 N (1 이상 100 이하).<br>다음 N줄에 센서 id와 온도(정수).",
    "ex_out": "Sensor 1: OK\nSensor 2: ALERT\nSensor 3: OK\nAlerts: 1\nHottest: Sensor 2 (85)",
    "deadline": "2026-05-25T23:59",
    "cases": [
      {
        "id": 1,
        "expected": "Sensor 1: OK\nSensor 2: ALERT\nSensor 3: OK\nAlerts: 1\nHottest: Sensor 2 (85)\n",
        "pts": 25,
        "input": "3\n1 75\n2 85\n3 60\n"
      },
      {
        "id": 2,
        "input": "4\n1 80\n2 81\n3 79\n4 100\n",
        "expected": "Sensor 1: OK\nSensor 2: ALERT\nSensor 3: OK\nSensor 4: ALERT\nAlerts: 2\nHottest: Sensor 4 (100)\n",
        "pts": 25
      },
      {
        "id": 3,
        "expected": "Sensor 1: OK\nSensor 2: OK\nAlerts: 0\nHottest: Sensor 1 (50)\n",
        "pts": 25,
        "input": "2\n1 50\n2 50\n"
      },
      {
        "input": "3\n1 90\n2 85\n3 95\n",
        "expected": "Sensor 1: ALERT\nSensor 2: ALERT\nSensor 3: ALERT\nAlerts: 3\nHottest: Sensor 3 (95)\n",
        "pts": 25,
        "id": 4
      }
    ],
    "output_desc": "각 센서에 대해 <code>Sensor id: OK</code> 또는 <code>Sensor id: ALERT</code> 출력.<br>마지막 두 줄에 <code>Alerts: (개수)</code>, <code>Hottest: Sensor id (temp)</code>.",
    "ex_in": "3\n1 75\n2 85\n3 60",
    "week": "Week 12A: Structs – Part A",
    "desc": "N개의 센서 id와 온도를 구조체 배열로 입력받아 상태를 출력하시오.<br><code>typedef struct { int id; int temp; } Sensor;</code>를 정의하시오.<br>함수 <code>int is_alert(const Sensor *s)</code>를 작성하여 온도가 80 초과이면 1, 이하이면 0을 반환하시오.<br>마지막에 경보 횟수와 가장 온도가 높은 센서를 출력하시오.<br>Hint: <code>const Sensor *s</code> — 읽기 전용 포인터, 호출 시 <code>is_alert(&amp;arr[i])</code>.",
    "title": "Sensor Temperature Alert"
  },
  {
    "id": "stc3",
    "deadline": "2026-05-25T23:59",
    "cases": [
      {
        "pts": 25,
        "expected": "Top: Carol (91)\nBottom: Bob (72)\nAverage: 82.67\n",
        "input": "3\nAlice 85\nBob 72\nCarol 91\n",
        "id": 1
      },
      {
        "expected": "Top: Eve (90)\nBottom: Dave (70)\nAverage: 82.50\n",
        "pts": 25,
        "input": "4\nDave 70\nEve 90\nFrank 80\nGrace 90\n",
        "id": 2
      },
      {
        "id": 3,
        "input": "1\nSolo 100\n",
        "pts": 25,
        "expected": "Top: Solo (100)\nBottom: Solo (100)\nAverage: 100.00\n"
      },
      {
        "pts": 25,
        "expected": "Top: E (100)\nBottom: A (60)\nAverage: 80.00\n",
        "input": "5\nA 60\nB 70\nC 80\nD 90\nE 100\n",
        "id": 4
      }
    ],
    "input_desc": "첫째 줄에 N (1 이상 100 이하). 다음 N줄에 이름(공백없음)과 점수(정수).",
    "ex_out": "Top: Carol (91)\nBottom: Bob (72)\nAverage: 82.67",
    "desc": "N명의 학생 이름과 점수를 입력받아 최고점 학생, 최저점 학생, 평균을 출력하시오.<br><code>typedef struct { char name[30]; int score; } Student;</code>를 정의하시오.<br>Hint: best, worst 인덱스를 따로 추적하고 합계를 누적해서 평균을 계산.",
    "ex_in": "3\nAlice 85\nBob 72\nCarol 91",
    "output_desc": "<code>Top: 이름 (점수)</code><br><code>Bottom: 이름 (점수)</code><br><code>Average: 평균</code> (소수점 둘째 자리)",
    "week": "Week 12A: Structs – Part A",
    "title": "Grade Statistics"
  },
  {
    "id": "bp1",
    "week": "Week 10B: Pointers – Part B",
    "createdAt": "2026-05-12T00:00",
    "deadline": "2026-05-18T23:59",
    "title": "Pointer to Pointer: Modify Variable",
    "desc": "정수 변수 <code>x</code>의 값을 <b>이중 포인터</b>(<code>int **pp</code>)를 통해 변경하는 프로그램을 작성하시오.<br><br><b>이중 포인터란?</b><br>포인터의 포인터입니다.<br>• <code>int *p = &x;</code> → <code>p</code>는 <code>x</code>의 주소를 저장. <code>*p</code>로 <code>x</code>에 접근.<br>• <code>int **pp = &p;</code> → <code>pp</code>는 <code>p</code>의 주소를 저장. <code>**pp</code>로 <code>x</code>에 접근.<br>• 즉, <code>**pp = 새값;</code> 이라고 쓰면 <code>x</code>의 값이 바뀝니다.<br><br>함수 원형: <code>void change_value(int **pp, int newval)</code><br>이 함수는 <code>**pp = newval;</code> 한 줄이면 됩니다.<br><br><b>코드 (빈칸을 채우세요):</b><div class=\"io-box\">void change_value(int **pp, int newval) {\n    ___ = newval;    // pp를 두 번 역참조하면 x에 도달\n}\n\nint main(void) {\n    int x;\n    scanf(\"%d\", &x);\n\n    int *p = &x;       // p는 x를 가리킴\n    int **pp = ___;    // pp는 p를 가리킴 (p의 주소)\n\n    printf(\"Before: %d\\n\", x);\n    change_value(pp, x * 2);\n    printf(\"After: %d\\n\", x);\n    return 0;\n}</div>",
    "input_desc": "정수 하나.",
    "output_desc": "<code>Before: (원래값)</code><br><code>After: (2배값)</code>",
    "ex_in": "5",
    "ex_out": "Before: 5\nAfter: 10"
  },
  {
    "id": "bp2",
    "week": "Week 10B: Pointers – Part B",
    "createdAt": "2026-05-12T00:00",
    "deadline": "2026-05-18T23:59",
    "title": "Count Character (Pointer Traversal)",
    "desc": "문자열과 문자 하나를 입력받아, <b>포인터로 문자열을 순회</b>하며 해당 문자가 몇 번 등장하는지 세시오.<br><br><b>포인터 순회 패턴:</b><br>문자열은 끝에 <code>'\\0'</code>(널 문자)이 있습니다.<br>① 포인터 <code>p</code>를 문자열 시작에 놓는다: <code>const char *p = s;</code><br>② <code>*p</code>가 <code>'\\0'</code>이 아닌 동안 반복: <code>while (*p)</code><br>③ 현재 문자 확인 후 다음으로 이동: <code>p++</code><br>이 패턴은 <code>strlen</code> 구현과 동일합니다 (강의 p.27).<br><br>함수 원형: <code>int count_char(const char *s, char c)</code><br><br><b>코드 (빈칸을 채우세요):</b><div class=\"io-box\">int count_char(const char *s, char c) {\n    int count = 0;\n    const char *p = ___;   // 포인터를 문자열 시작에 놓기\n    while (___) {          // 널 문자가 아닌 동안 반복\n        if (*p == c)\n            count++;\n        ___;               // 다음 문자로 이동\n    }\n    return count;\n}</div><br><b>main 코드:</b><div class=\"io-box\">int main(void) {\n    char str[101];\n    char c;\n    scanf(\"%s\", str);\n    scanf(\" %c\", &c);   // \" %c\": 앞의 공백이 줄바꿈을 건너뜀\n    printf(\"Count: %d\\n\", count_char(str, c));\n    return 0;\n}</div>",
    "input_desc": "첫째 줄에 문자열 (길이 100 이하, 공백 없음). 둘째 줄에 문자 한 개.",
    "output_desc": "형식: <code>Count: (값)</code>",
    "ex_in": "mississippi\ns",
    "ex_out": "Count: 4"
  },
  {
    "id": "bp3",
    "week": "Week 10B: Pointers – Part B",
    "createdAt": "2026-05-12T00:00",
    "deadline": "2026-05-18T23:59",
    "title": "Apply Function (Function Pointer)",
    "desc": "정수 배열과 변환 선택(1~3)을 입력받아, <b>함수 포인터</b>로 선택된 함수를 각 원소에 적용하시오.<br>선택: 1 = 제곱, 2 = 2배, 3 = 부호 반전.<br><br><b>함수 포인터란?</b><br>C에서 함수도 메모리에 저장되어 있어서, 그 주소를 변수에 담을 수 있습니다.<br>• <code>int (*fn)(int)</code> = \"int를 받아 int를 리턴하는 함수\"를 가리키는 포인터<br>• 함수 이름 자체가 주소이므로: <code>int (*fn)(int) = square;</code> 이렇게 대입<br>• 호출은 보통 함수처럼: <code>fn(5)</code> → <code>square(5)</code>와 동일<br><br><b>dispatch table이란?</b><br>함수 포인터 여러 개를 배열에 넣으면, 번호로 함수를 골라 호출할 수 있습니다 (강의 p.23).<br><code>int (*ops[3])(int) = { square, dbl, neg };</code><br><code>ops[0](5)</code> → <code>square(5)</code>, <code>ops[1](5)</code> → <code>dbl(5)</code>, ...<br><br><b>코드 (빈칸을 채우세요):</b><div class=\"io-box\">#include &lt;stdio.h&gt;\n\nint square(int x) { return ___; }   // x의 제곱\nint dbl(int x)    { return ___; }   // x의 2배\nint neg(int x)    { return ___; }   // x의 부호 반전\n\n// fn은 함수 포인터: int를 받아 int를 리턴하는 함수\nvoid transform(int *arr, int n, int (*fn)(int)) {\n    int i;\n    for (i = 0; i < n; i++)\n        arr[i] = fn(arr[i]);   // fn을 통해 함수 호출\n}\n\nint main(void) {\n    int arr[50], n, choice, i;\n    scanf(\"%d\", &n);\n    for (i = 0; i < n; i++) scanf(\"%d\", &arr[i]);\n    scanf(\"%d\", &choice);\n\n    // 함수 포인터 배열 (dispatch table)\n    int (*ops[3])(int) = { square, dbl, neg };\n    transform(arr, n, ops[___ - 1]);  // choice에 맞는 함수 선택\n\n    for (i = 0; i < n; i++)\n        printf(\"%d%c\", arr[i], i < n-1 ? ' ' : '\\n');\n    return 0;\n}</div>",
    "input_desc": "첫째 줄에 n (1 이상 50 이하). 둘째 줄에 정수 n개. 셋째 줄에 선택(1, 2, 3).",
    "output_desc": "변환된 배열을 공백으로 구분하여 한 줄 출력.",
    "ex_in": "4\n1 2 3 4\n1",
    "ex_out": "1 4 9 16"
  },
  {
    "id": "bp4",
    "week": "Week 10B: Pointers – Part B",
    "createdAt": "2026-05-12T00:00",
    "deadline": "2026-05-18T23:59",
    "title": "2D Array Row Max",
    "desc": "m x n 행렬을 입력받아 각 행의 최댓값을 출력하시오.<br><br><b>접근 방법:</b><br>1차원 배열에서 최댓값을 구하는 방법을 이미 알고 있을 것입니다.<br>① 첫 번째 원소를 최댓값으로 가정<br>② 나머지 원소와 비교하며 더 큰 값이 나오면 갱신<br>이것을 각 행(row)마다 반복하면 됩니다. 바깥 for문이 행, 안쪽 for문이 열입니다.<br><br>함수 원형: <code>void row_max(int mat[][10], int m, int n, int *result)</code><br><code>result[r]</code>에 r번째 행의 최댓값을 저장합니다.<br><br><b>코드 (빈칸을 채우세요):</b><div class=\"io-box\">void row_max(int mat[][10], int m, int n, int *result) {\n    int r, c;\n    for (r = 0; r < m; r++) {\n        result[r] = mat[r][0];           // 각 행의 첫 원소로 초기화\n        for (c = 1; c < n; c++) {\n            if (mat[r][c] > _____)       // 현재 최댓값보다 크면\n                _____ = mat[r][c];       // 갱신\n        }\n    }\n}</div><br><b>main 코드:</b><div class=\"io-box\">int main(void) {\n    int mat[10][10], result[10], m, n, r, c;\n    scanf(\"%d %d\", &m, &n);\n    for (r = 0; r < m; r++)\n        for (c = 0; c < n; c++)\n            scanf(\"%d\", &mat[r][c]);\n\n    row_max(mat, m, n, result);\n\n    for (r = 0; r < m; r++)\n        printf(\"Row %d: %d\\n\", r, result[r]);\n    return 0;\n}</div>",
    "input_desc": "첫째 줄에 m, n (1 이상 10 이하). 다음 m줄에 각 n개 정수.",
    "output_desc": "각 행의 최댓값을 <code>Row 0: (값)</code> 형식으로 한 줄씩 출력.",
    "ex_in": "3 4\n1 2 3 4\n5 6 7 8\n9 10 11 12",
    "ex_out": "Row 0: 4\nRow 1: 8\nRow 2: 12"
  },
  {
    "id": "bp5",
    "week": "Week 10B: Pointers – Part B",
    "createdAt": "2026-05-12T00:00",
    "deadline": "2026-05-18T23:59",
    "title": "Longest String",
    "desc": "n개의 문자열을 입력받아 가장 긴 문자열을 출력하시오. 길이가 같으면 먼저 입력된 것을 출력.<br><br><b>핵심 개념: 문자열 포인터 배열</b><br>문자열 여러 개를 다루려면 2가지가 필요합니다:<br>① <code>char buf[20][51]</code> — 실제 문자열이 저장되는 공간 (2차원 배열)<br>② <code>const char *arr[20]</code> — 각 문자열의 시작 주소를 저장하는 포인터 배열<br><code>arr[i] = buf[i];</code>로 연결하면, <code>arr[i]</code>를 통해 i번째 문자열에 접근할 수 있습니다.<br><code>strlen(arr[i])</code>로 길이를 비교합니다.<br><br>함수 원형: <code>const char *find_longest(const char *arr[], int n)</code><br>가장 긴 문자열의 포인터를 반환합니다.<br><br><b>함수 코드 (빈칸을 채우세요):</b><div class=\"io-box\">const char *find_longest(const char *arr[], int n) {\n    const char *best = arr[0];   // 첫 문자열이 가장 길다고 가정\n    int i;\n    for (i = 1; i < n; i++) {\n        if (strlen(___) > strlen(___))  // i번째가 best보다 길면\n            best = ___;                 // best를 갱신\n    }\n    return best;\n}</div><br><b>main 코드 (빈칸을 채우세요):</b><div class=\"io-box\">int main(void) {\n    char buf[20][51];       // 문자열 저장 공간\n    const char *arr[20];    // 포인터 배열\n    int n, i;\n    scanf(\"%d\", &n);\n    for (i = 0; i < n; i++) {\n        scanf(\"%s\", buf[i]);     // buf[i]에 문자열 저장\n        arr[i] = ___;            // 포인터가 buf[i]를 가리키게\n    }\n    printf(\"%s\\n\", find_longest(arr, n));\n    return 0;\n}</div>",
    "input_desc": "첫째 줄에 n (1 이상 20 이하). 다음 n줄에 문자열 (각 길이 50 이하, 공백 없음).",
    "output_desc": "가장 긴 문자열 한 줄 출력.",
    "ex_in": "3\napple\nbanana\nkiwi",
    "ex_out": "banana"
  },
  {
    "id": "bc1",
    "week": "Week 10B: Pointers – Part B",
    "createdAt": "2026-05-12T00:00",
    "deadline": "2026-05-18T23:59",
    "title": "String Reverse (Pointer)",
    "desc": "문자열을 입력받아 포인터를 이용하여 뒤집어 출력하시오.<br><br><b>알고리즘 (강의 p.15):</b><br>양쪽 끝에 포인터를 하나씩 놓고, 서로를 향해 한 칸씩 이동하며 문자를 교환합니다.<br>① <code>start</code> = 맨 앞 문자, <code>end</code> = 맨 뒤 문자<br>② <code>start < end</code>인 동안: 두 문자를 swap → <code>start++</code>, <code>end--</code><br>③ 가운데서 만나면 종료 → 문자열이 뒤집혀 있음<br><br>예) <code>\"Hello\"</code> → H와 o 교환 → e와 l 교환 → 가운데 l은 그대로 → <code>\"olleH\"</code><br><br>함수 원형: <code>void str_reverse(char *s)</code><br><br><b>코드 (빈칸을 채우세요):</b><div class=\"io-box\">void str_reverse(char *s) {\n    char *start = s;                  // 맨 앞\n    char *end = s + strlen(s) - 1;    // 맨 뒤\n    while (start < end) {\n        // 두 문자 교환 (swap)\n        char tmp = *start;\n        *start = ___;     // start 위치에 end의 문자를\n        *end = ___;       // end 위치에 tmp(원래 start 문자)를\n        start++;          // 앞에서 한 칸 전진\n        ___;              // 뒤에서 한 칸 후퇴\n    }\n}</div><br><b>main 코드:</b><div class=\"io-box\">int main(void) {\n    char s[101];\n    scanf(\"%s\", s);\n    str_reverse(s);\n    printf(\"%s\\n\", s);\n    return 0;\n}</div>",
    "input_desc": "문자열 하나 (길이 100 이하, 공백 없음).",
    "output_desc": "뒤집힌 문자열 한 줄 출력.",
    "ex_in": "Hello",
    "ex_out": "olleH"
  },
  {
    "id": "bc2",
    "week": "Week 10B: Pointers – Part B",
    "createdAt": "2026-05-12T00:00",
    "deadline": "2026-05-18T23:59",
    "title": "Sort Strings with qsort",
    "desc": "n개의 문자열을 입력받아 <code>qsort</code>로 알파벳 순 정렬하여 출력하시오.<br><br><b>qsort 사용법 (강의 p.36~37):</b><br><code>qsort(배열, 개수, 원소크기, 비교함수);</code><br>• 어떤 타입이든 정렬할 수 있는 범용 함수입니다 (<code>stdlib.h</code>).<br>• 대신 \"두 원소를 어떻게 비교할지\" 알려주는 비교 함수를 직접 만들어야 합니다.<br>• 비교 함수는 음수/0/양수를 리턴합니다 (작다/같다/크다).<br><br><b>비교 함수의 <code>const void *</code>가 어려울 수 있습니다:</b><br><code>qsort</code>는 어떤 타입이든 받기 위해 <code>const void *</code>를 씁니다.<br>우리가 정렬하는 건 <code>char *</code> 배열이므로, 비교 함수 안에서 <code>const char **</code>로 캐스팅합니다.<br>이 부분은 패턴으로 외워 두면 됩니다.<br><br><b>비교 함수 (이 부분은 그대로 쓰세요):</b><div class=\"io-box\">int cmp(const void *a, const void *b) {\n    const char *sa = *(const char **)a;\n    const char *sb = *(const char **)b;\n    return strcmp(sa, sb);   // 사전순 비교\n}</div><br><b>main 코드 (빈칸을 채우세요):</b><div class=\"io-box\">int main(void) {\n    char buf[20][51];       // 실제 문자열 저장 공간\n    const char *arr[20];    // 포인터 배열\n    int n, i;\n    scanf(\"%d\", &n);\n    for (i = 0; i < n; i++) {\n        scanf(\"%s\", ___);    // buf[i]에 문자열 저장\n        arr[i] = ___;        // 포인터가 buf[i]를 가리킴\n    }\n\n    qsort(arr, n, sizeof(char *), ___);  // 비교함수 이름\n\n    for (i = 0; i < n; i++)\n        printf(\"%s\\n\", arr[i]);\n    return 0;\n}</div>",
    "input_desc": "첫째 줄에 n (2 이상 20 이하). 다음 n줄에 문자열 (길이 50 이하, 공백 없음).",
    "output_desc": "알파벳 오름차순으로 한 줄에 하나씩 출력.",
    "ex_in": "4\nbanana\napple\ncherry\ndate",
    "ex_out": "apple\nbanana\ncherry\ndate"
  },
  {
    "id": "pc1",
    "desc": "정수 배열에서 특정 값의 원소를 모두 제거하는 함수를 <b>읽기/쓰기 두 포인터(read/write pointer)</b>로 in-place 구현하시오.<br>함수 원형: <code>int remove_val(int *arr, int n, int target)</code> — 반환값은 남은 원소 수.<br>Hint: <code>int *rd = arr, *wr = arr;</code>로 시작. <code>rd</code>로 순회하며 <code>*rd != target</code>이면 <code>*wr++ = *rd</code>로 복사. <code>rd</code>는 항상 증가.",
    "ex_in": "6\n1 2 3 2 4 2\n2",
    "deadline": "2026-05-11T23:59",
    "title": "Remove All Occurrences",
    "ex_out": "Count: 3\n1 3 4",
    "cases": [
      {
        "id": 1,
        "expected": "Count: 3\n1 3 4\n",
        "input": "6\n1 2 3 2 4 2\n2\n",
        "pts": 25
      },
      {
        "pts": 25,
        "expected": "Count: 4\n1 2 3 4\n",
        "input": "4\n1 2 3 4\n9\n",
        "id": 2
      },
      {
        "pts": 25,
        "id": 3,
        "expected": "Count: 2\n-1 -2\n",
        "input": "5\n0 -1 0 -2 0\n0\n"
      },
      {
        "id": 4,
        "expected": "Count: 0\n",
        "input": "5\n5 5 5 5 5\n5\n",
        "pts": 25
      }
    ],
    "output_desc": "첫째 줄: <code>Count: &lt;남은 원소 수&gt;</code><br>남은 원소가 있으면 둘째 줄에 공백으로 구분하여 출력.",
    "createdAt": "2026-05-05T00:00",
    "week": "Week 10A: Pointers",
    "input_desc": "첫째 줄에 n (1 ≤ n ≤ 100). 둘째 줄에 n개 정수. 셋째 줄에 제거할 target."
  },
  {
    "id": "pc2",
    "input_desc": "첫째 줄에 n (1 ≤ n ≤ 100). 둘째 줄에 n개 정수.",
    "createdAt": "2026-05-05T00:00",
    "week": "Week 10A: Pointers",
    "cases": [
      {
        "expected": "Second max: 7\n",
        "input": "5\n3 7 2 9 5\n",
        "id": 1,
        "pts": 25
      },
      {
        "expected": "No second max\n",
        "input": "5\n1 1 1 1 1\n",
        "id": 2,
        "pts": 25
      },
      {
        "id": 3,
        "expected": "Second max: 4\n",
        "input": "2\n4 9\n",
        "pts": 25
      },
      {
        "id": 4,
        "expected": "Second max: 5\n",
        "input": "6\n10 10 5 3 10 2\n",
        "pts": 25
      }
    ],
    "output_desc": "형식: <code>Second max: &lt;값&gt;</code> 또는 <code>No second max</code>",
    "ex_out": "Second max: 7",
    "title": "Second Maximum",
    "ex_in": "5\n3 7 2 9 5",
    "deadline": "2026-05-11T23:59",
    "desc": "정수 배열에서 <b>두 번째로 큰 값(second maximum)</b>을 포인터 순회로 구하시오. 두 번째 최댓값은 최댓값보다 작은 원소들 중 가장 큰 값으로 정의한다 (중복 최댓값은 최댓값으로 취급, 예: [9,9,3]의 두 번째 최댓값은 3).<br>모든 원소가 최댓값과 같으면 <code>No second max</code>를 출력한다.<br>Hint: 포인터로 1회 순회해 <code>max1</code>을 구한 뒤, 다시 순회하며 <code>*p != max1</code>인 원소들의 최댓값을 구한다."
  },
  {
    "id": "pp1",
    "desc": "정수 두 개를 입력받아 <b>포인터를 이용한 swap() 함수</b>로 두 값을 교환한 뒤 출력하시오.<br>함수 원형: <code>void swap(int *a, int *b)</code><br>Hint: <code>int tmp = *a; *a = *b; *b = tmp;</code> — 포인터로 값을 교환하는 기본 패턴.",
    "deadline": "2026-05-11T23:59",
    "ex_in": "1 2",
    "createdAt": "2026-05-05T00:00",
    "week": "Week 10A: Pointers",
    "input_desc": "한 줄에 정수 두 개 (공백 구분).",
    "ex_out": "2 1",
    "title": "Swap Two Numbers",
    "output_desc": "교환된 두 정수를 공백으로 구분하여 한 줄 출력.",
    "cases": [
      {
        "id": 1,
        "input": "1 2\n",
        "expected": "2 1\n",
        "pts": 25
      },
      {
        "id": 2,
        "expected": "-5 10\n",
        "input": "10 -5\n",
        "pts": 25
      },
      {
        "pts": 25,
        "expected": "100 0\n",
        "input": "0 100\n",
        "id": 3
      },
      {
        "pts": 25,
        "id": 4,
        "input": "-3 -7\n",
        "expected": "-7 -3\n"
      }
    ]
  },
  {
    "id": "pp2",
    "cases": [
      {
        "pts": 25,
        "id": 1,
        "input": "5\n1 2 3 4 5\n",
        "expected": "5 4 3 2 1\n"
      },
      {
        "id": 2,
        "expected": "40 30 20 10\n",
        "input": "4\n10 20 30 40\n",
        "pts": 25
      },
      {
        "pts": 25,
        "id": 3,
        "expected": "42\n",
        "input": "1\n42\n"
      },
      {
        "id": 4,
        "input": "6\n-3 0 5 -1 2 8\n",
        "expected": "8 2 -1 5 0 -3\n",
        "pts": 25
      }
    ],
    "output_desc": "뒤집힌 배열을 공백으로 구분하여 한 줄 출력.",
    "ex_out": "5 4 3 2 1",
    "title": "Reverse Array",
    "input_desc": "첫째 줄에 정수 n (1 ≤ n ≤ 100). 둘째 줄에 공백으로 구분된 정수 n개.",
    "createdAt": "2026-05-05T00:00",
    "week": "Week 10A: Pointers",
    "ex_in": "5\n1 2 3 4 5",
    "deadline": "2026-05-11T23:59",
    "desc": "정수 배열을 입력받아 <b>포인터 산술(pointer arithmetic)만 사용</b>하여 in-place로 뒤집어 출력하시오 ([] 인덱싱 사용 금지).<br>Hint: <code>int *left = arr, *right = arr + n - 1;</code>로 시작해, <code>left &lt; right</code>인 동안 <code>*left</code>와 <code>*right</code>를 swap한 뒤 <code>left++; right--;</code>"
  },
  {
    "id": "pp3",
    "title": "Array Statistics",
    "ex_out": "Sum: 15\nMin: 1\nMax: 5\nAvg: 3.00",
    "cases": [
      {
        "input": "5\n1 2 3 4 5\n",
        "expected": "Sum: 15\nMin: 1\nMax: 5\nAvg: 3.00\n",
        "id": 1,
        "pts": 25
      },
      {
        "id": 2,
        "expected": "Sum: 60\nMin: 10\nMax: 30\nAvg: 20.00\n",
        "input": "3\n10 20 30\n",
        "pts": 25
      },
      {
        "expected": "Sum: -4\nMin: -5\nMax: 3\nAvg: -1.00\n",
        "input": "4\n-2 -5 0 3\n",
        "id": 3,
        "pts": 25
      },
      {
        "expected": "Sum: 7\nMin: 7\nMax: 7\nAvg: 7.00\n",
        "input": "1\n7\n",
        "id": 4,
        "pts": 25
      }
    ],
    "output_desc": "네 줄 출력: <code>Sum: &lt;값&gt;</code> / <code>Min: &lt;값&gt;</code> / <code>Max: &lt;값&gt;</code> / <code>Avg: &lt;값&gt;</code> (소수점 둘째 자리)",
    "createdAt": "2026-05-05T00:00",
    "week": "Week 10A: Pointers",
    "input_desc": "첫째 줄에 정수 n (1 ≤ n ≤ 100). 둘째 줄에 공백으로 구분된 정수 n개.",
    "desc": "정수 배열을 입력받아 합계·최솟값·최댓값·평균을 계산하는 함수를 <b>output parameter(포인터 매개변수)</b> 패턴으로 작성하시오.<br>함수 원형: <code>void stats(const int *arr, int n, int *sum, int *mn, int *mx)</code><br>Hint: 순회는 <code>const int *p = arr; p &lt; arr + n; p++</code>. 평균은 main에서 (double)sum / n으로 계산.",
    "ex_in": "5\n1 2 3 4 5",
    "deadline": "2026-05-11T23:59"
  },
  {
    "id": "pp4",
    "desc": "정수 배열에서 <b>첫 번째 음수</b>를 찾아 그 값과 인덱스를 출력하시오. 음수가 없으면 <code>Not found</code>를 출력한다.<br>함수 원형: <code>int *find_neg(int *arr, int n)</code> — 찾으면 해당 원소의 포인터, 없으면 <code>NULL</code> 반환.<br>Hint: main에서 <code>if (result != NULL)</code>로 확인. 인덱스 계산: <code>result - arr</code> (포인터 뺄셈).",
    "deadline": "2026-05-11T23:59",
    "ex_in": "5\n3 -1 5 -2 0",
    "createdAt": "2026-05-05T00:00",
    "week": "Week 10A: Pointers",
    "input_desc": "첫째 줄에 정수 n (1 ≤ n ≤ 100). 둘째 줄에 공백으로 구분된 정수 n개.",
    "ex_out": "Found: -1 at index 1",
    "title": "Find First Negative",
    "output_desc": "형식: <code>Found: &lt;값&gt; at index &lt;k&gt;</code> 또는 <code>Not found</code>",
    "cases": [
      {
        "input": "5\n3 -1 5 -2 0\n",
        "expected": "Found: -1 at index 1\n",
        "id": 1,
        "pts": 25
      },
      {
        "pts": 25,
        "id": 2,
        "expected": "Not found\n",
        "input": "4\n1 2 3 4\n"
      },
      {
        "input": "3\n-5 0 1\n",
        "expected": "Found: -5 at index 0\n",
        "id": 3,
        "pts": 25
      },
      {
        "pts": 25,
        "id": 4,
        "input": "4\n0 0 0 -3\n",
        "expected": "Found: -3 at index 3\n"
      }
    ]
  },
  {
    "id": "pp5",
    "deadline": "2026-05-11T23:59",
    "ex_in": "5\n3 7 2 9 5",
    "desc": "정수 배열에서 <b>최댓값의 포인터</b>를 반환하는 함수를 작성하고, 반환된 포인터로 최댓값을 0으로 바꾼 뒤 결과 배열을 출력하시오.<br>함수 원형: <code>int *max_ptr(int *arr, int n)</code><br>Hint: 포인터 <code>m</code>이 최댓값 위치를 가리키도록 갱신. 인덱스 계산: <code>m - arr</code>. 반환 후 <code>*m = 0</code>으로 수정.",
    "output_desc": "두 줄 출력.<br>첫째 줄: <code>Max: &lt;값&gt; at index &lt;k&gt;</code><br>둘째 줄: 최댓값을 0으로 바꾼 배열 (공백 구분)",
    "cases": [
      {
        "pts": 25,
        "expected": "Max: 9 at index 3\n3 7 2 0 5\n",
        "input": "5\n3 7 2 9 5\n",
        "id": 1
      },
      {
        "pts": 25,
        "id": 2,
        "input": "4\n-1 -5 -2 -3\n",
        "expected": "Max: -1 at index 0\n0 -5 -2 -3\n"
      },
      {
        "pts": 25,
        "input": "5\n10 20 30 20 10\n",
        "expected": "Max: 30 at index 2\n10 20 0 20 10\n",
        "id": 3
      },
      {
        "input": "3\n1 1 1\n",
        "expected": "Max: 1 at index 0\n0 1 1\n",
        "id": 4,
        "pts": 25
      }
    ],
    "ex_out": "Max: 9 at index 3\n3 7 2 0 5",
    "title": "Pointer to Maximum",
    "input_desc": "첫째 줄에 정수 n (1 ≤ n ≤ 100). 둘째 줄에 공백으로 구분된 정수 n개.",
    "createdAt": "2026-05-05T00:00",
    "week": "Week 10A: Pointers"
  },
  {
    "id": "sc1",
    "deadline": "2026-05-11T23:59",
    "desc": "문자열과 정수 k가 주어진다. 영문자만 알파벳 순으로 k칸 시프트하여 출력하시오 (대소문자는 각각 유지, 숫자·공백·기호는 그대로).<br>Z를 넘어가면 A로 돌아오는 wrap-around 처리. k는 음수일 수 있으므로 <code>(c - 'A' + k % 26 + 26) % 26 + 'A'</code> 패턴으로 안전하게 처리.",
    "ex_in": "Hello, World!\n3",
    "output_desc": "암호화된 문자열 한 줄.",
    "title": "Caesar Cipher",
    "ex_out": "Khoor, Zruog!",
    "week": "Week 9B: Strings",
    "input_desc": "첫째 줄에 문자열 (길이 ≤ 200), 둘째 줄에 정수 k (-1000 ≤ k ≤ 1000).",
    "cases": [
      {
        "expected": "Khoor, Zruog!\n",
        "pts": 25,
        "id": 1,
        "input": "Hello, World!\n3\n"
      },
      {
        "input": "abcXYZ\n1\n",
        "id": 2,
        "pts": 25,
        "expected": "bcdYZA\n"
      },
      {
        "id": 3,
        "input": "Khoor, Zruog!\n-3\n",
        "expected": "Hello, World!\n",
        "pts": 25
      },
      {
        "pts": 25,
        "expected": "Programming 2026!\n",
        "input": "Programming 2026!\n26\n",
        "id": 4
      }
    ]
  },
  {
    "id": "sc2",
    "input_desc": "한 줄의 문자열 (길이 ≤ 200).",
    "cases": [
      {
        "input": "Hello World C\n",
        "id": 1,
        "pts": 25,
        "expected": "C World Hello\n"
      },
      {
        "id": 2,
        "input": "the quick brown fox\n",
        "expected": "fox brown quick the\n",
        "pts": 25
      },
      {
        "input": "single\n",
        "id": 3,
        "pts": 25,
        "expected": "single\n"
      },
      {
        "expected": "here spaces multiple\n",
        "pts": 25,
        "id": 4,
        "input": "  multiple   spaces  here\n"
      }
    ],
    "week": "Week 9B: Strings",
    "ex_out": "C World Hello",
    "ex_in": "Hello World C",
    "output_desc": "단어 순서가 뒤집힌 한 줄.",
    "title": "Reverse Words",
    "deadline": "2026-05-11T23:59",
    "desc": "한 줄의 문자열을 받아 <b>단어 단위로</b> 뒤집어 출력하시오. 예: <code>\"Hello World C\"</code> → <code>\"C World Hello\"</code>.<br>단어 사이의 여러 공백은 한 칸으로 줄여서 출력하면 된다.<br>Hint: 단어들의 시작·끝 인덱스를 추적해서 거꾸로 출력."
  },
  {
    "id": "sc3",
    "cases": [
      {
        "expected": "LED is now ON\nLED is now OFF\nUnknown command\n",
        "pts": 25,
        "id": 1,
        "input": "LED ON\nLED OFF\nFOO\nQUIT\nLED ON\n"
      },
      {
        "pts": 25,
        "expected": "LED is now ON\nLED is now OFF\n",
        "input": "LED ON\nLED OFF\nQUIT\n",
        "id": 2
      },
      {
        "pts": 25,
        "expected": "Unknown command\nUnknown command\nLED is now ON\n",
        "input": "BAD\nXYZ 5\nLED ON\nQUIT\n",
        "id": 3
      },
      {
        "expected": "LED is now ON\nUnknown command\nLED is now OFF\nUnknown command\n",
        "pts": 25,
        "id": 4,
        "input": "LED ON\nHELLO\nLED OFF\nWORLD\nQUIT\n"
      }
    ],
    "input_desc": "여러 줄의 명령. 각 줄 길이 ≤ 50. <code>QUIT</code> 또는 EOF가 나오면 종료.",
    "week": "Week 9B: Strings",
    "ex_out": "LED is now ON\nLED is now OFF\nUnknown command",
    "output_desc": "각 명령에 대해 한 줄씩 결과 출력. <code>QUIT</code> 명령 자체는 출력 없음.",
    "title": "Command Parser",
    "ex_in": "LED ON\nLED OFF\nFOO\nQUIT\nLED ON",
    "desc": "간단한 임베디드 명령 파서를 만든다. 각 줄마다 다음 명령 중 하나가 주어진다:<br><code>LED ON</code> → <code>LED is now ON</code><br><code>LED OFF</code> → <code>LED is now OFF</code><br><code>QUIT</code> → 더 이상 명령을 읽지 않고 종료<br>그 외 명령 → <code>Unknown command</code><br><code>strncmp</code>로 명령을 인식하고, <code>fgets</code>로 한 줄씩 읽어 처리한다.",
    "deadline": "2026-05-11T23:59"
  },
  {
    "id": "sp1",
    "cases": [
      {
        "pts": 25,
        "expected": "Vowels: 3\nConsonants: 7\n",
        "input": "Hello World\n",
        "id": 1
      },
      {
        "input": "AEIOU aeiou\n",
        "id": 2,
        "pts": 25,
        "expected": "Vowels: 10\nConsonants: 0\n"
      },
      {
        "id": 3,
        "input": "Programming\n",
        "expected": "Vowels: 3\nConsonants: 8\n",
        "pts": 25
      },
      {
        "expected": "Vowels: 0\nConsonants: 1\n",
        "pts": 25,
        "id": 4,
        "input": "C 2026\n"
      }
    ],
    "input_desc": "한 줄의 문자열 (길이 ≤ 100, 공백 포함 가능).",
    "week": "Week 9B: Strings",
    "ex_out": "Vowels: 3\nConsonants: 7",
    "title": "Vowel and Consonant Count",
    "output_desc": "두 줄로 출력.<br>형식: <code>Vowels: &lt;값&gt;</code> (줄바꿈) <code>Consonants: &lt;값&gt;</code>",
    "ex_in": "Hello World",
    "desc": "한 줄의 영문 문자열을 입력받아, <b>모음(a, e, i, o, u)</b>과 <b>자음(나머지 영문자)</b>의 개수를 각각 출력하시오. 대소문자 구분 없이 모두 카운트.<br>공백, 숫자, 기호 등 영문자가 아닌 문자는 무시한다.<br><code>fgets</code>로 입력을 받고, <code>tolower</code>로 정규화 후 처리하는 패턴.",
    "deadline": "2026-05-11T23:59"
  },
  {
    "id": "sp2",
    "ex_in": "Hello world from C",
    "output_desc": "형식: <code>Words: &lt;값&gt;</code>",
    "title": "Word Count",
    "deadline": "2026-05-11T23:59",
    "desc": "한 줄의 문자열을 입력받아 <b>단어 개수</b>를 출력하시오. 단어는 공백이 아닌 문자의 연속이며, 여러 개의 공백·탭이 있어도 단어 사이로 본다.<br>Hint: <code>in_word</code> 플래그로 \"단어 안인지\"를 추적하면서 0→1로 바뀌는 순간 카운트.",
    "input_desc": "한 줄의 문자열 (길이 ≤ 200).",
    "cases": [
      {
        "pts": 25,
        "expected": "Words: 4\n",
        "input": "Hello world from C\n",
        "id": 1
      },
      {
        "pts": 25,
        "expected": "Words: 3\n",
        "input": "  multiple   spaces   here  \n",
        "id": 2
      },
      {
        "input": "single\n",
        "id": 3,
        "pts": 25,
        "expected": "Words: 1\n"
      },
      {
        "input": "       \n",
        "id": 4,
        "pts": 25,
        "expected": "Words: 0\n"
      }
    ],
    "ex_out": "Words: 4",
    "week": "Week 9B: Strings"
  },
  {
    "id": "sp3",
    "ex_out": "!dlroW ,olleH",
    "week": "Week 9B: Strings",
    "input_desc": "한 줄의 문자열 (길이 ≤ 200, 공백 포함 가능).",
    "cases": [
      {
        "pts": 25,
        "expected": "!dlroW ,olleH\n",
        "input": "Hello, World!\n",
        "id": 1
      },
      {
        "id": 2,
        "input": "abc\n",
        "expected": "cba\n",
        "pts": 25
      },
      {
        "pts": 25,
        "expected": "racecar\n",
        "input": "racecar\n",
        "id": 3
      },
      {
        "input": "C 2026\n",
        "id": 4,
        "pts": 25,
        "expected": "6202 C\n"
      }
    ],
    "deadline": "2026-05-11T23:59",
    "desc": "한 줄의 문자열을 입력받아 <b>뒤집어서</b> 출력하시오 (공백·기호도 그대로 유지, 그냥 글자 순서만 뒤집기).<br>Hint: 길이를 구한 뒤 양 끝 두 인덱스(i=0, j=len-1)로 swap, 또는 뒤에서부터 출력.",
    "ex_in": "Hello, World!",
    "title": "Reverse String",
    "output_desc": "뒤집힌 문자열 한 줄."
  },
  {
    "id": "sp4",
    "week": "Week 9B: Strings",
    "title": "Run-Length Encoding",
    "desc": "한 줄의 문자열을 입력받아 <b>Run-Length Encoding(RLE)</b>으로 압축하여 출력하시오.<br>연속된 같은 문자를 <code>횟수+문자</code>로 표현한다. 예: <code>aaabbc</code> → <code>3a2b1c</code>.<br>Hint: 인덱스 <code>i</code>에서 시작해 <code>s[i]</code>와 같은 문자가 몇 번 연속되는지 <code>count</code>로 세고, <code>printf(\"%d%c\", count, s[i])</code> 출력 후 <code>i += count</code>로 이동.",
    "input_desc": "한 줄의 문자열 (길이 ≤ 200, 공백 없음).",
    "output_desc": "RLE 압축 결과 한 줄.",
    "ex_in": "aaabbc",
    "ex_out": "3a2b1c",
    "deadline": "2026-05-11T23:59",
    "cases": [
      {
        "id": 1,
        "input": "aaabbc\n",
        "expected": "3a2b1c\n",
        "pts": 25
      },
      {
        "id": 2,
        "input": "aaa\n",
        "expected": "3a\n",
        "pts": 25
      },
      {
        "id": 3,
        "input": "abcd\n",
        "expected": "1a1b1c1d\n",
        "pts": 25
      },
      {
        "id": 4,
        "input": "aaabbbccc\n",
        "expected": "3a3b3c\n",
        "pts": 25
      }
    ]
  },
  {
    "id": "sp5",
    "cases": [
      {
        "id": 1,
        "input": "abababab\nab\n",
        "expected": "Count: 4\n",
        "pts": 25
      },
      {
        "id": 2,
        "input": "aaaa\naa\n",
        "expected": "Count: 2\n",
        "pts": 25
      },
      {
        "id": 3,
        "input": "Hello world hello world\nhello\n",
        "expected": "Count: 1\n",
        "pts": 25
      },
      {
        "id": 4,
        "input": "abcdefg\nxyz\n",
        "expected": "Count: 0\n",
        "pts": 25
      }
    ],
    "input_desc": "첫째 줄에 문자열 S, 둘째 줄에 부분문자열 P (둘 다 길이 ≤ 200, P는 비어있지 않음).",
    "week": "Week 9B: Strings",
    "ex_out": "Count: 4",
    "output_desc": "형식: <code>Count: &lt;값&gt;</code>",
    "title": "Substring Count",
    "ex_in": "abababab\nab",
    "desc": "문자열 S와 부분문자열 P가 주어진다. S 안에서 P가 <b>몇 번 등장</b>하는지 출력하시오 (겹치지 않는 등장으로 셈, 즉 한 번 매치되면 매치 길이만큼 건너뛰기). <b>대소문자를 구분한다(case-sensitive).</b><br>Hint: 인덱스 i를 0부터 이동하면서, <code>s[i+j] == p[j]</code> 를 j=0..strlen(p)-1 동안 비교하는 중첩 루프. 전부 일치하면 count++, i를 strlen(p)만큼 건너뜀.",
    "deadline": "2026-05-11T23:59"
  },
  {
    "id": "ac1",
    "deadline": "2026-05-04T23:59",
    "cases": [
      {
        "pts": 25,
        "expected": "Diagonal: 15\n",
        "id": 1,
        "input": "3\n1 2 3\n4 5 6\n7 8 9"
      },
      {
        "id": 2,
        "input": "1\n42",
        "expected": "Diagonal: 42\n",
        "pts": 25
      },
      {
        "expected": "Diagonal: 10\n",
        "pts": 25,
        "input": "4\n1 0 0 0\n0 2 0 0\n0 0 3 0\n0 0 0 4",
        "id": 3
      },
      {
        "pts": 25,
        "expected": "Diagonal: -6\n",
        "id": 4,
        "input": "3\n-1 5 5\n5 -2 5\n5 5 -3"
      }
    ],
    "output_desc": "형식: <code>Diagonal: &lt;값&gt;</code>",
    "input_desc": "첫째 줄에 정수 N (1 ≤ N ≤ 10), 이후 N줄에 각 줄에 N개의 정수.",
    "ex_out": "Diagonal: 15",
    "title": "Sum of Diagonal",
    "week": "Week 9A: Arrays",
    "desc": "N×N 정사각 행렬이 주어졌을 때, <b>주대각선(main diagonal)</b>의 원소들의 합을 출력하시오.<br>주대각선은 <code>A[0][0], A[1][1], ..., A[N-1][N-1]</code> 위치의 원소들이다.<br>Hint: 2차원 배열 <code>int A[10][10]</code>을 선언하고, <code>A[i][i]</code>만 더하면 된다.",
    "ex_in": "3\n1 2 3\n4 5 6\n7 8 9"
  },
  {
    "id": "ac2",
    "ex_out": "   1   5   9\n   2   6  10\n   3   7  11\n   4   8  12",
    "input_desc": "첫째 줄에 두 정수 R, C (1 ≤ R, C ≤ 10), 이후 R줄에 각 줄에 C개의 정수.",
    "title": "Matrix Transpose",
    "week": "Week 9A: Arrays",
    "desc": "R×C 행렬이 주어졌을 때, 그 <b>전치행렬(transpose)</b> C×R을 출력하시오.<br>전치는 <code>T[j][i] = A[i][j]</code>로 행과 열을 바꾸는 연산이다.<br>출력은 각 원소를 4칸 너비로 우정렬: <code>printf(\"%4d\", x)</code>.",
    "ex_in": "3 4\n1 2 3 4\n5 6 7 8\n9 10 11 12",
    "deadline": "2026-05-04T23:59",
    "cases": [
      {
        "expected": "   1   5   9\n   2   6  10\n   3   7  11\n   4   8  12\n",
        "pts": 25,
        "input": "3 4\n1 2 3 4\n5 6 7 8\n9 10 11 12",
        "id": 1
      },
      {
        "id": 2,
        "input": "2 2\n1 2\n3 4",
        "expected": "   1   3\n   2   4\n",
        "pts": 25
      },
      {
        "id": 3,
        "input": "1 5\n10 20 30 40 50",
        "pts": 25,
        "expected": "  10\n  20\n  30\n  40\n  50\n"
      },
      {
        "expected": "   1   0   0\n   0   1   0\n   0   0   1\n",
        "pts": 25,
        "id": 4,
        "input": "3 3\n1 0 0\n0 1 0\n0 0 1"
      }
    ],
    "output_desc": "C줄에 걸쳐 전치행렬을 출력. 각 원소는 %4d 형식."
  },
  {
    "id": "ap1",
    "input_desc": "첫째 줄에 정수 N (1 ≤ N ≤ 100), 둘째 줄에 N개의 정수가 공백으로 구분되어 주어진다.",
    "ex_out": "50 40 30 20 10",
    "week": "Week 9A: Arrays",
    "title": "Reverse Print",
    "ex_in": "5\n10 20 30 40 50",
    "desc": "정수 N과 N개의 정수를 입력받아 배열에 저장한 뒤, <b>입력의 역순으로</b> 한 줄에 공백으로 구분하여 출력하시오.<br>배열을 다루는 가장 기본적인 패턴 — <code>for (i = N-1; i >= 0; i--)</code> 로 뒤에서부터 접근.",
    "cases": [
      {
        "id": 1,
        "input": "5\n10 20 30 40 50",
        "pts": 25,
        "expected": "50 40 30 20 10\n"
      },
      {
        "id": 2,
        "input": "1\n7",
        "expected": "7\n",
        "pts": 25
      },
      {
        "pts": 25,
        "expected": "1 8 -2 5 0 -3\n",
        "input": "6\n-3 0 5 -2 8 1",
        "id": 3
      },
      {
        "expected": "10 9 8 7 6 5 4 3 2 1\n",
        "pts": 25,
        "input": "10\n1 2 3 4 5 6 7 8 9 10",
        "id": 4
      }
    ],
    "deadline": "2026-05-04T23:59",
    "output_desc": "역순으로 N개의 정수를 한 줄에 공백으로 구분하여 출력. 끝에 줄바꿈."
  },
  {
    "id": "ap2",
    "week": "Week 9A: Arrays",
    "title": "Above Average",
    "ex_in": "5\n70 80 90 60 50",
    "desc": "N명의 점수가 주어졌을 때, 평균을 넘는 학생이 몇 명인지 출력하시오.<br><code>double avg</code>로 평균을 계산한 뒤, 한 번 더 순회하며 <code>score[i] &gt; avg</code> 조건으로 카운트한다.",
    "ex_out": "Above: 2",
    "input_desc": "첫째 줄에 정수 N (1 ≤ N ≤ 100), 둘째 줄에 N개의 정수 점수가 공백으로 구분되어 주어진다.",
    "output_desc": "형식: <code>Above: &lt;값&gt;</code>",
    "cases": [
      {
        "expected": "Above: 2\n",
        "pts": 25,
        "input": "5\n70 80 90 60 50",
        "id": 1
      },
      {
        "expected": "Above: 0\n",
        "pts": 25,
        "input": "1\n100",
        "id": 2
      },
      {
        "input": "6\n10 10 10 10 10 10",
        "id": 3,
        "pts": 25,
        "expected": "Above: 0\n"
      },
      {
        "input": "8\n100 95 87 60 55 40 30 70",
        "id": 4,
        "expected": "Above: 4\n",
        "pts": 25
      }
    ],
    "deadline": "2026-05-04T23:59"
  },
  {
    "id": "ap3",
    "output_desc": "형식: <code>Second: &lt;값&gt;</code>",
    "deadline": "2026-05-04T23:59",
    "cases": [
      {
        "input": "5\n3 1 4 1 5",
        "id": 1,
        "pts": 25,
        "expected": "Second: 4\n"
      },
      {
        "id": 2,
        "input": "4\n5 3 5 1",
        "pts": 25,
        "expected": "Second: 3\n"
      },
      {
        "pts": 25,
        "expected": "Second: 50\n",
        "input": "6\n10 20 30 40 50 60",
        "id": 3
      },
      {
        "expected": "Second: 7\n",
        "pts": 25,
        "id": 4,
        "input": "5\n7 7 7 7 7"
      }
    ],
    "desc": "N개의 정수가 주어졌을 때, <b>두 번째로 큰 값</b>을 출력하시오.<br>주의: 같은 값이 여러 개 있어도 두 번째로 큰 \"값\"을 의미한다. 예: <code>{5, 3, 5, 1}</code>의 두 번째 큰 값은 <code>3</code>.<br>Hint: 한 번의 순회로 <code>max1, max2</code> 두 변수를 갱신할 수 있다.",
    "ex_in": "5\n3 1 4 1 5",
    "title": "Second Largest",
    "week": "Week 9A: Arrays",
    "ex_out": "Second: 4",
    "input_desc": "첫째 줄에 정수 N (2 ≤ N ≤ 100), 둘째 줄에 N개의 정수가 공백으로 구분되어 주어진다."
  },
  {
    "id": "ap4",
    "week": "Week 9A: Arrays",
    "title": "Count Occurrences",
    "ex_in": "8\n3 1 4 1 5 9 2 6\n1",
    "desc": "N개의 정수가 주어진 뒤 정수 X가 추가로 주어진다. 배열 안에서 X가 몇 번 나타나는지 출력하시오.<br>선형 탐색 패턴 — 배열을 한 번 순회하며 카운트.",
    "ex_out": "Count: 2",
    "input_desc": "첫째 줄에 정수 N (1 ≤ N ≤ 100), 둘째 줄에 N개의 정수, 셋째 줄에 정수 X가 주어진다.",
    "output_desc": "형식: <code>Count: &lt;값&gt;</code>",
    "cases": [
      {
        "pts": 25,
        "expected": "Count: 2\n",
        "id": 1,
        "input": "8\n3 1 4 1 5 9 2 6\n1"
      },
      {
        "id": 2,
        "input": "5\n7 7 7 7 7\n7",
        "expected": "Count: 5\n",
        "pts": 25
      },
      {
        "id": 3,
        "input": "5\n1 2 3 4 5\n10",
        "pts": 25,
        "expected": "Count: 0\n"
      },
      {
        "expected": "Count: 5\n",
        "pts": 25,
        "id": 4,
        "input": "10\n0 1 0 1 0 1 0 1 0 1\n0"
      }
    ],
    "deadline": "2026-05-04T23:59"
  },
  {
    "id": "ap5",
    "week": "Week 9A: Arrays",
    "title": "Shift Right by One",
    "ex_in": "5\n1 2 3 4 5",
    "desc": "N개의 정수를 입력받아 <b>오른쪽으로 한 칸씩 회전(rotate)</b>한 결과를 출력하시오. 맨 끝 값이 맨 앞으로 이동한다.<br>예: <code>1 2 3 4 5</code> → <code>5 1 2 3 4</code><br>Hint: 마지막 원소를 임시 변수에 저장한 뒤, 뒤에서부터 한 칸씩 옮긴다.",
    "input_desc": "첫째 줄에 정수 N (1 ≤ N ≤ 100), 둘째 줄에 N개의 정수가 공백으로 구분되어 주어진다.",
    "ex_out": "5 1 2 3 4",
    "output_desc": "회전된 N개의 정수를 한 줄에 공백으로 구분하여 출력. 끝에 줄바꿈.",
    "cases": [
      {
        "input": "5\n1 2 3 4 5",
        "id": 1,
        "pts": 25,
        "expected": "5 1 2 3 4\n"
      },
      {
        "pts": 25,
        "expected": "42\n",
        "id": 2,
        "input": "1\n42"
      },
      {
        "input": "6\n10 20 30 40 50 60",
        "id": 3,
        "pts": 25,
        "expected": "60 10 20 30 40 50\n"
      },
      {
        "input": "4\n-1 -2 -3 -4",
        "id": 4,
        "expected": "-4 -1 -2 -3\n",
        "pts": 25
      }
    ],
    "deadline": "2026-05-04T23:59"
  },
  {
    "id": "ap6",
    "output_desc": "회문이면 <code>Palindrome: Yes</code>, 아니면 <code>Palindrome: No</code>를 출력.",
    "cases": [
      {
        "expected": "Palindrome: Yes\n",
        "pts": 25,
        "id": 1,
        "input": "5\n1 2 3 2 1"
      },
      {
        "pts": 25,
        "expected": "Palindrome: No\n",
        "id": 2,
        "input": "3\n1 2 3"
      },
      {
        "pts": 25,
        "expected": "Palindrome: Yes\n",
        "id": 3,
        "input": "1\n42"
      },
      {
        "id": 4,
        "input": "6\n1 2 3 3 2 1",
        "expected": "Palindrome: Yes\n",
        "pts": 25
      }
    ],
    "deadline": "2026-05-04T23:59",
    "week": "Week 9A: Arrays",
    "title": "Palindrome Array",
    "ex_in": "5\n1 2 3 2 1",
    "desc": "N개의 정수로 이루어진 배열이 <b>회문(palindrome)</b>인지 판정하시오. 회문 배열이란 앞뒤로 읽어도 같은 배열을 말한다. 예: <code>{1, 2, 3, 2, 1}</code>은 회문, <code>{1, 2, 3}</code>은 회문 아님.<br>두 포인터(<code>i = 0, j = N-1</code>)로 양 끝부터 비교.",
    "ex_out": "Palindrome: Yes",
    "input_desc": "첫째 줄에 정수 N (1 ≤ N ≤ 100), 둘째 줄에 N개의 정수가 공백으로 구분되어 주어진다."
  },
  {
    id:'p1', week:'Week 6: Control flow - switch, if-else if', title:'Calculator with switch',
    desc:'한 줄로 <code>a op b</code>를 입력받아 switch(op)로 연산 결과를 출력하시오. 연산자: <code>+</code> <code>-</code> <code>*</code> <code>/</code>. 0으로 나누기는 <code>/</code> 케이스 안에서 if로 처리.',
    input_desc:'한 줄에 <code>a op b</code> 형식으로 주어진다. (예: <code>5 + 3</code>)',
    output_desc:'결과를 소수점 둘째 자리까지 출력 (숫자만, 레이블 없음):<br><code>5 + 3</code> → <code>8.00</code><br><code>10 - 4</code> → <code>6.00</code><br><code>10 / 3</code> → <code>3.33</code><br>0으로 나누기: <code>5 / 0</code> → <code>Error: division by zero</code>',
    ex_in:'10 / 3', ex_out:'3.33', deadline:'2026-04-13T23:59',
    cases:[
      {id:1,input:'5 + 3',  expected:'8.00',                   pts:25},
      {id:2,input:'10 - 4', expected:'6.00',                   pts:25},
      {id:3,input:'10 / 3', expected:'3.33',                   pts:25},
      {id:4,input:'5 / 0',  expected:'Error: division by zero',pts:25},
    ]
  },
  {
    id:'p2', week:'Week 6: Control flow - switch, if-else if', title:'Season Finder',
    desc:'월 번호(1-12)를 입력받아 계절을 출력하시오. <b>fall-through</b>를 이용한 switch로 작성할 것.<br>계절 매핑: 3, 4, 5월 → Spring &nbsp; 6, 7, 8월 → Summer &nbsp; 9, 10, 11월 → Autumn &nbsp; 12, 1, 2월 → Winter',
    input_desc:'첫째 줄에 월 번호(1-12)가 주어진다.',
    output_desc:'해당 계절을 출력한다: <code>Spring</code> / <code>Summer</code> / <code>Autumn</code> / <code>Winter</code><br>범위 외: <code>Invalid month</code>',
    ex_in:'4', ex_out:'Spring', deadline:'2026-04-13T23:59',
    cases:[
      {id:1,input:'4',  expected:'Spring', pts:25},
      {id:2,input:'7',  expected:'Summer', pts:25},
      {id:3,input:'10', expected:'Autumn', pts:25},
      {id:4,input:'1',  expected:'Winter', pts:25},
    ]
  },
  {
    id:'p3', week:'Week 6: Control flow - switch, if-else if', title:'Vending Machine',
    desc:'자판기 프로그램을 작성하시오.<br>메뉴: 1. Coffee (1500원) &nbsp; 2. Tea (1200원) &nbsp; 3. Juice (2000원) &nbsp; 4. Water (800원)<br>switch로 가격을 설정하고, if로 투입 금액을 확인할 것.<br><b>주의:</b> 메뉴 목록이나 입력 안내 문자는 출력하지 않는다. 결과 한 줄만 출력.',
    input_desc:'첫째 줄에 선택 번호, 둘째 줄에 투입 금액(원)이 주어진다.',
    output_desc:'충분: <code>Dispensing... Change: N won</code><br>부족: <code>Insufficient! Need N more won</code><br>잘못된 선택: <code>Invalid selection!</code>',
    ex_in:'1\n2000', ex_out:'Dispensing... Change: 500 won', deadline:'2026-04-13T23:59',
    cases:[
      {id:1,input:'1\n2000', expected:'Dispensing... Change: 500 won',      pts:25},
      {id:2,input:'2\n1000', expected:'Insufficient! Need 200 more won',    pts:25},
      {id:3,input:'3\n5000', expected:'Dispensing... Change: 3000 won',     pts:25},
      {id:4,input:'5\n1000', expected:'Invalid selection!',                  pts:25},
    ]
  },
  {
    id:'p4', week:'Week 6: Control flow - switch, if-else if', title:'Grade Classifier',
    desc:'점수(0-100)를 입력받아 학점을 출력하시오. <code>switch(score / 10)</code>을 이용할 것.<br>90~100 → Grade: A &nbsp; 80~89 → Grade: B &nbsp; 70~79 → Grade: C &nbsp; 60~69 → Grade: D &nbsp; 0~59 → Grade: F<br>Hint: score=100일 때 score/10은 10',
    input_desc:'한 줄에 점수(정수)가 주어진다.',
    output_desc:'형식: <code>Grade: A</code> / <code>Grade: B</code> / <code>Grade: C</code> / <code>Grade: D</code> / <code>Grade: F</code><br>범위 외(음수 또는 100 초과): <code>Invalid score</code>',
    ex_in:'85', ex_out:'Grade: B', deadline:'2026-04-13T23:59',
    cases:[
      {id:1,input:'95', expected:'Grade: A', pts:25},
      {id:2,input:'82', expected:'Grade: B', pts:25},
      {id:3,input:'75', expected:'Grade: C', pts:25},
      {id:4,input:'45', expected:'Grade: F', pts:25},
    ]
  },

  /* ── Week 5B Challenge ────────────────────────── */
  {
    id:'c1', week:'Week 6: Control flow - switch, if-else if', title:'Tax Bracket Calculator',
    desc:'연소득(원, 정수)을 입력받아 누진세를 계산하시오.<br>세율 구간 (각 구간 금액에만 해당 세율 적용):<br>~14,000,000 → 6% / ~50,000,000 → 15% / ~88,000,000 → 24% / 초과 → 35%<br>예: 60,000,000원 = 14M×6% + 36M×15% + 10M×24% = 8,640,000원 (60M×24% 아님!)<br><b>힌트:</b> 누진 구간 계산에는 if-else if 체인이 더 적합합니다.',
    input_desc:'첫째 줄에 연소득(원, 정수)이 주어진다.',
    output_desc:'형식: <code>Tax: N won</code><br><code>14000000</code> → <code>Tax: 840000 won</code><br><code>60000000</code> → <code>Tax: 8640000 won</code><br><code>100000000</code> → <code>Tax: 19560000 won</code>',
    ex_in:'60000000', ex_out:'Tax: 8640000 won', deadline:'2026-04-13T23:59',
    cases:[
      {id:1,input:'14000000',  expected:'Tax: 840000 won',   pts:25},
      {id:2,input:'60000000',  expected:'Tax: 8640000 won',  pts:25},
      {id:3,input:'100000000', expected:'Tax: 19560000 won', pts:25},
      {id:4,input:'5000000',   expected:'Tax: 300000 won',   pts:25},
    ]
  },
  {
    id:'c2', week:'Week 6: Control flow - switch, if-else if', title:'Blackjack Hand Evaluator',
    desc:'카드 문자 2개를 입력받아 블랙잭 핸드 점수를 계산하시오.<br>카드 값: <code>A</code>=11 &nbsp; <code>2-9</code>=면 값 &nbsp; <code>T, J, Q, K</code>=10 (fall-through 활용)<br>대소문자 모두 처리. 숫자 카드는 <code>c - \'0\'</code> 트릭 사용.',
    input_desc:'첫째 줄에 Card 1, 둘째 줄에 Card 2 문자를 입력한다. (A, 2-9, T, J, Q, K)',
    output_desc:'<code>Card 1: N</code><br><code>Card 2: N</code><br>합계 21: <code>Total: 21 (Blackjack!)</code><br>합계 &gt;21: <code>Total: N (Bust)</code><br>그 외: <code>Total: N</code><br>유효하지 않은 카드: <code>Invalid card</code>',
    ex_in:'A\nK', ex_out:'Card 1: 11\nCard 2: 10\nTotal: 21 (Blackjack!)', deadline:'2026-04-13T23:59',
    cases:[
      {id:1,input:'A\nK', expected:'Card 1: 11\nCard 2: 10\nTotal: 21 (Blackjack!)', pts:25},
      {id:2,input:'T\nJ', expected:'Card 1: 10\nCard 2: 10\nTotal: 20',              pts:25},
      {id:3,input:'A\nA', expected:'Card 1: 11\nCard 2: 11\nTotal: 22 (Bust)',       pts:25},
      {id:4,input:'7\n9', expected:'Card 1: 7\nCard 2: 9\nTotal: 16',               pts:25},
    ]
  },
  {
    id:'c3', week:'Week 6: Control flow - switch, if-else if', title:'Membership Discount Calculator',
    desc:'멤버십 등급과 구매 금액을 입력받아 할인 금액과 최종 가격을 출력하시오.<br>등급별 기본 할인율: 1.Bronze 5% &nbsp; 2.Silver 10% &nbsp; 3.Gold 15% &nbsp; 4.Platinum 20%<br>구매 금액이 100,000원 이상이면 추가 5% 할인 적용<br>잘못된 등급 번호: <code>Invalid membership</code>',
    input_desc:'첫째 줄에 멤버십 등급(1-4), 둘째 줄에 구매 금액(원, 양의 정수)이 주어진다.',
    output_desc:'<code>Discount: X%</code><br><code>Final: N won</code><br>예: 등급 1, 50000원 → <code>Discount: 5%</code> / <code>Final: 47500 won</code><br>예: 등급 3, 150000원 → <code>Discount: 20%</code> / <code>Final: 120000 won</code>',
    ex_in:'2\n150000', ex_out:'Discount: 15%\nFinal: 127500 won', deadline:'2026-04-13T23:59',
    cases:[
      {id:1,input:'1\n50000',  expected:'Discount: 5%\nFinal: 47500 won',   pts:25},
      {id:2,input:'3\n150000', expected:'Discount: 20%\nFinal: 120000 won', pts:25},
      {id:3,input:'4\n80000',  expected:'Discount: 20%\nFinal: 64000 won',  pts:25},
      {id:4,input:'2\n100000', expected:'Discount: 15%\nFinal: 85000 won',  pts:25},
    ]
  },
  {
    id:'c4', week:'Week 6: Control flow - switch, if-else if', title:'Unit Converter',
    desc:'switch로 단위 변환을 구현하시오.<br>1. km → mi &nbsp; 2. °C → °F &nbsp; 3. kg → lb &nbsp; 4. cm → in<br>변환 공식: mi=km×0.621371, F=C×9/5+32, lb=kg×2.20462, in=cm÷2.54<br><b>주의:</b> 메뉴 목록이나 입력 안내 문자 출력 없이 변환 결과 한 줄만 출력.',
    input_desc:'첫째 줄에 메뉴 번호(1-4), 둘째 줄에 변환할 값(double)이 주어진다.',
    output_desc:'소수점 둘째 자리로 출력. 형식:<br><code>50.00 km = 31.07 mi</code><br><code>20.00 C = 68.00 F</code><br><code>70.00 kg = 154.32 lb</code><br><code>100.00 cm = 39.37 in</code><br>잘못된 번호: <code>Invalid!</code>',
    ex_in:'1\n50', ex_out:'50.00 km = 31.07 mi', deadline:'2026-04-13T23:59',
    cases:[
      {id:1,input:'1\n50',  expected:'50.00 km = 31.07 mi',   pts:25},
      {id:2,input:'2\n20',  expected:'20.00 C = 68.00 F',     pts:25},
      {id:3,input:'3\n70',  expected:'70.00 kg = 154.32 lb',  pts:25},
      {id:4,input:'4\n100', expected:'100.00 cm = 39.37 in',  pts:25},
    ]
  },
  {
    id:'c5', week:'Week 6: Control flow - switch, if-else if', title:'Mini ATM System',
    desc:'PIN(1234)을 검증하고 메뉴를 처리하는 ATM을 작성하시오. 초기 잔액: 100,000원. switch로 메뉴 처리, if로 검증.<br><b>각 메뉴 출력 형식:</b><br>1. 잔액 확인 → <code>Balance: N won</code><br>2. 입금 (금액 입력) → <code>Balance: N won</code> (잔액만 출력)<br>3. 출금 (금액 입력) → 성공: <code>Dispensed N won</code> 후 <code>Balance: N won</code> / 부족: <code>Insufficient!</code> 후 <code>Balance: N won</code><br>4. 종료 → <code>Goodbye!</code>',
    input_desc:'첫째 줄: PIN. 올바르면 둘째 줄: 메뉴(1-4). 메뉴 2·3이면 셋째 줄: 금액.',
    output_desc:'PIN 오류: <code>Wrong PIN!</code><br>메뉴 1 (잔액): <code>Balance: N won</code><br>메뉴 2 (입금 후): <code>Balance: N won</code><br>메뉴 3 성공: <code>Dispensed N won</code> → <code>Balance: N won</code><br>메뉴 3 부족: <code>Insufficient!</code> → <code>Balance: N won</code><br>메뉴 4: <code>Goodbye!</code>',
    ex_in:'1234\n1', ex_out:'Balance: 100000 won', deadline:'2026-04-13T23:59',
    cases:[
      {id:1,input:'9999\n1',         expected:'Wrong PIN!',                         pts:25},
      {id:2,input:'1234\n1',         expected:'Balance: 100000 won',                pts:25},
      {id:3,input:'1234\n2\n50000',  expected:'Balance: 150000 won',                pts:25},
      {id:4,input:'1234\n3\n30000',  expected:'Dispensed 30000 won\nBalance: 70000 won', pts:25},
    ]
  },

  /* ── Week 6B: Control flow - Loops (while, do-while, for) ── Practice ── */
  {
    id:'lp1', week:'Week 6B: Control flow - Loops (while, do-while, for)', title:'Sum 1 to N',
    desc:'양의 정수 <code>N</code>을 입력받아 1부터 N까지의 합을 출력하시오. <b>for 또는 while 루프</b>로 누적합을 계산할 것 (공식 사용 금지).',
    input_desc:'첫째 줄에 정수 N (1 ≤ N ≤ 10000) 이 주어진다.',
    output_desc:'형식: <code>Sum: &lt;합&gt;</code><br>예: N=10 → <code>Sum: 55</code>',
    ex_in:'10', ex_out:'Sum: 55', deadline:'2026-04-16T23:59',
    cases:[
      {id:1, input:'10',   expected:'Sum: 55',     pts:25},
      {id:2, input:'100',  expected:'Sum: 5050',   pts:25},
      {id:3, input:'1',    expected:'Sum: 1',      pts:25},
      {id:4, input:'1000', expected:'Sum: 500500', pts:25},
    ]
  },
  {
    id:'lp2', week:'Week 6B: Control flow - Loops (while, do-while, for)', title:'Multiplication Table (1 dan)',
    desc:'정수 N (2 ≤ N ≤ 9)을 입력받아 N단 구구단을 9줄 출력하시오. <b>for 루프</b>로 작성할 것.',
    input_desc:'첫째 줄에 정수 N (2 ≤ N ≤ 9).',
    output_desc:'9줄 출력 (각 줄 형식: <code>N x i = N*i</code>)<br>예: N=2 →<br><code>2 x 1 = 2</code><br><code>2 x 2 = 4</code><br>...<br><code>2 x 9 = 18</code>',
    ex_in:'2', ex_out:'2 x 1 = 2\n2 x 2 = 4\n2 x 3 = 6\n2 x 4 = 8\n2 x 5 = 10\n2 x 6 = 12\n2 x 7 = 14\n2 x 8 = 16\n2 x 9 = 18', deadline:'2026-04-16T23:59',
    cases:[
      {id:1, input:'2', expected:'2 x 1 = 2\n2 x 2 = 4\n2 x 3 = 6\n2 x 4 = 8\n2 x 5 = 10\n2 x 6 = 12\n2 x 7 = 14\n2 x 8 = 16\n2 x 9 = 18', pts:25},
      {id:2, input:'5', expected:'5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n5 x 4 = 20\n5 x 5 = 25\n5 x 6 = 30\n5 x 7 = 35\n5 x 8 = 40\n5 x 9 = 45', pts:25},
      {id:3, input:'7', expected:'7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35\n7 x 6 = 42\n7 x 7 = 49\n7 x 8 = 56\n7 x 9 = 63', pts:25},
      {id:4, input:'9', expected:'9 x 1 = 9\n9 x 2 = 18\n9 x 3 = 27\n9 x 4 = 36\n9 x 5 = 45\n9 x 6 = 54\n9 x 7 = 63\n9 x 8 = 72\n9 x 9 = 81', pts:25},
    ]
  },
  {
    id:'lp3', week:'Week 6B: Control flow - Loops (while, do-while, for)', title:'Reverse Digits',
    desc:'양의 정수 N을 입력받아 자릿수를 거꾸로 한 정수를 출력하시오. <b>while 루프</b>로 <code>n%10</code>(마지막 자리)과 <code>n/=10</code>(자리 제거)을 활용할 것. 선행 0은 자동으로 사라진다 (예: 100 → 1).',
    input_desc:'첫째 줄에 양의 정수 N (1 ≤ N ≤ 1,000,000).',
    output_desc:'형식: <code>Reversed: &lt;뒤집은 수&gt;</code><br>예: 12345 → <code>Reversed: 54321</code><br>예: 100 → <code>Reversed: 1</code>',
    ex_in:'12345', ex_out:'Reversed: 54321', deadline:'2026-04-16T23:59',
    cases:[
      {id:1, input:'12345', expected:'Reversed: 54321', pts:25},
      {id:2, input:'100',   expected:'Reversed: 1',     pts:25},
      {id:3, input:'7',     expected:'Reversed: 7',     pts:25},
      {id:4, input:'80706', expected:'Reversed: 60708', pts:25},
    ]
  },
  {
    id:'lp4', week:'Week 6B: Control flow - Loops (while, do-while, for)', title:'N-th Fibonacci',
    desc:'정의: F(1)=1, F(2)=1, F(n)=F(n-1)+F(n-2). 정수 N을 입력받아 N번째 피보나치 수를 출력하시오. <b>for 루프 + 두 변수 갱신</b>으로 작성할 것 (재귀 금지 — 느림).',
    input_desc:'첫째 줄에 정수 N (1 ≤ N ≤ 40).',
    output_desc:'형식: <code>F(N) = &lt;값&gt;</code><br>예: N=10 → <code>F(10) = 55</code>',
    ex_in:'10', ex_out:'F(10) = 55', deadline:'2026-04-16T23:59',
    cases:[
      {id:1, input:'1',  expected:'F(1) = 1',      pts:25},
      {id:2, input:'10', expected:'F(10) = 55',     pts:25},
      {id:3, input:'20', expected:'F(20) = 6765',   pts:25},
      {id:4, input:'30', expected:'F(30) = 832040', pts:25},
    ]
  },
  {
    id:'lp5', week:'Week 6B: Control flow - Loops (while, do-while, for)', title:'Sum Until Zero',
    desc:'정수를 한 줄에 하나씩 입력받아 누적합을 구하시오. <b>0이 입력되면 입력 종료</b>이며, 0은 합계에 포함되지 않는다. <b>while 루프 + 센티넬(sentinel) 패턴</b>으로 작성할 것.',
    input_desc:'각 줄에 정수가 하나씩 주어진다. 0이 나오면 입력이 끝난다.',
    output_desc:'형식: <code>Sum: &lt;누적합&gt;</code><br>예: 1,2,3,4,5,0 → <code>Sum: 15</code>',
    ex_in:'1\n2\n3\n4\n5\n0', ex_out:'Sum: 15', deadline:'2026-04-16T23:59',
    cases:[
      {id:1, input:'1\n2\n3\n4\n5\n0',              expected:'Sum: 15', pts:25},
      {id:2, input:'10\n20\n30\n0',                  expected:'Sum: 60', pts:25},
      {id:3, input:'0',                              expected:'Sum: 0',  pts:25},
      {id:4, input:'7\n7\n7\n7\n7\n7\n7\n7\n7\n7\n0', expected:'Sum: 70', pts:25},
    ]
  },
  {
    id:'lp6', week:'Week 6B: Control flow - Loops (while, do-while, for)', title:'Find Min and Max',
    desc:'정수의 개수 <code>N</code>과 N개의 정수를 입력받아 최솟값과 최댓값을 출력하시오. <b>for 루프</b>로 한 번만 순회하며 비교할 것. <b>주의:</b> min/max의 초기값은 0이 아니라 <b>첫 번째 입력값</b>으로 설정해야 한다 (음수 입력 고려).',
    input_desc:'첫째 줄에 정수 N (1 ≤ N ≤ 100). 둘째 줄부터 N개의 정수가 한 줄에 하나씩 주어진다 (-1000 ≤ 값 ≤ 1000).',
    output_desc:'두 줄로 출력:<br><code>Min: &lt;최솟값&gt;</code><br><code>Max: &lt;최댓값&gt;</code>',
    ex_in:'5\n3\n-1\n7\n2\n4', ex_out:'Min: -1\nMax: 7', deadline:'2026-04-16T23:59',
    cases:[
      {id:1, input:'5\n3\n-1\n7\n2\n4',           expected:'Min: -1\nMax: 7',     pts:25},
      {id:2, input:'1\n42',                        expected:'Min: 42\nMax: 42',    pts:25},
      {id:3, input:'4\n-5\n-10\n-3\n-8',          expected:'Min: -10\nMax: -3',   pts:25},
      {id:4, input:'6\n100\n200\n50\n300\n150\n250', expected:'Min: 50\nMax: 300', pts:25},
    ]
  },

  /* ── Week 6B: Control flow - Loops ── Challenge ── */
  {
    id:'lc1', week:'Week 6B: Control flow - Loops (while, do-while, for)', title:'Prime Counter (≤ N)',
    desc:'양의 정수 N을 입력받아 1 이상 N 이하의 <b>소수의 개수</b>를 출력하시오. 각 수에 대해 2부터 √k까지 나눠보고, 나누어떨어지면 즉시 <code>break</code>로 빠져나오는 방식으로 작성할 것.',
    input_desc:'첫째 줄에 정수 N (1 ≤ N ≤ 10000).',
    output_desc:'형식: <code>Primes &lt;= N: &lt;개수&gt;</code><br>예: N=10 → <code>Primes &lt;= 10: 4</code> (2,3,5,7)',
    ex_in:'10', ex_out:'Primes <= 10: 4', deadline:'2026-04-16T23:59',
    cases:[
      {id:1, input:'10',  expected:'Primes <= 10: 4',   pts:25},
      {id:2, input:'30',  expected:'Primes <= 30: 10',  pts:25},
      {id:3, input:'100', expected:'Primes <= 100: 25', pts:25},
      {id:4, input:'1',   expected:'Primes <= 1: 0',    pts:25},
    ]
  },
  {
    id:'lc2', week:'Week 6B: Control flow - Loops (while, do-while, for)', title:'GCD (Euclidean Algorithm)',
    desc:'두 양의 정수 a, b의 최대공약수(GCD)를 유클리드 호제법으로 구하시오.<br><b>알고리즘:</b><br>&nbsp;&nbsp;<code>while (b != 0) { t = b; b = a % b; a = t; }</code><br>&nbsp;&nbsp;GCD = a',
    input_desc:'첫째 줄에 두 양의 정수 a b가 공백으로 구분되어 주어진다 (1 ≤ a, b ≤ 1,000,000).',
    output_desc:'형식: <code>GCD: &lt;값&gt;</code><br>예: <code>48 18</code> → <code>GCD: 6</code>',
    ex_in:'48 18', ex_out:'GCD: 6', deadline:'2026-04-16T23:59',
    cases:[
      {id:1, input:'48 18',  expected:'GCD: 6',  pts:25},
      {id:2, input:'100 75', expected:'GCD: 25', pts:25},
      {id:3, input:'17 31',  expected:'GCD: 1',  pts:25},
      {id:4, input:'60 24',  expected:'GCD: 12', pts:25},
    ]
  },
  {
    id:'lc3', week:'Week 6B: Control flow - Loops (while, do-while, for)', title:'Collatz Steps',
    desc:'양의 정수 N에 대해 Collatz 수열(짝수면 n/2, 홀수면 3n+1)을 1이 될 때까지 반복했을 때 걸리는 단계 수를 출력하시오. (N이 이미 1이면 0단계)',
    input_desc:'첫째 줄에 양의 정수 N (1 ≤ N ≤ 1000).',
    output_desc:'형식: <code>Steps: &lt;단계수&gt;</code><br>예: N=6 → 6→3→10→5→16→8→4→2→1 (8단계) → <code>Steps: 8</code>',
    ex_in:'6', ex_out:'Steps: 8', deadline:'2026-04-16T23:59',
    cases:[
      {id:1, input:'1',  expected:'Steps: 0',   pts:25},
      {id:2, input:'6',  expected:'Steps: 8',   pts:25},
      {id:3, input:'27', expected:'Steps: 111', pts:25},
      {id:4, input:'9',  expected:'Steps: 19',  pts:25},
    ]
  },
  {
    id:'lc4', week:'Week 6B: Control flow - Loops (while, do-while, for)', title:'Star Diamond',
    desc:'정수 N을 입력받아 높이 2N-1의 <b>마름모(다이아몬드)</b>를 출력하시오. 각 줄은 (N-i)개의 공백 + (2i-1)개의 별 (<code>*</code>)로 구성된다. 위쪽 절반과 아래쪽 절반을 두 개의 중첩 for 루프로 그릴 것.',
    input_desc:'첫째 줄에 정수 N (1 ≤ N ≤ 9).',
    output_desc:'2N-1 줄의 마름모를 출력. 각 줄 끝에 불필요한 공백 없음.<br>예: N=3 →<br><code>&nbsp;&nbsp;*</code><br><code>&nbsp;***</code><br><code>*****</code><br><code>&nbsp;***</code><br><code>&nbsp;&nbsp;*</code>',
    ex_in:'3', ex_out:'  *\n ***\n*****\n ***\n  *', deadline:'2026-04-16T23:59',
    cases:[
      {id:1, input:'2', expected:' *\n***\n *',                                              pts:25},
      {id:2, input:'3', expected:'  *\n ***\n*****\n ***\n  *',                               pts:25},
      {id:3, input:'4', expected:'   *\n  ***\n *****\n*******\n *****\n  ***\n   *',          pts:25},
      {id:4, input:'5', expected:'    *\n   ***\n  *****\n *******\n*********\n *******\n  *****\n   ***\n    *', pts:25},
    ]
  },
  {
    id:'lc5', week:'Week 6B: Control flow - Loops (while, do-while, for)', title:'Digital Root with Steps',
    desc:'양의 정수 N의 각 자릿수를 더하는 과정을 한 자리가 될 때까지 반복하고, 모든 중간 결과를 <code>-&gt;</code>로 연결해 한 줄에 출력하시오. (이미 한 자리면 그 수만 출력)<br>예: 9875 → 9+8+7+5=29 → 2+9=11 → 1+1=2',
    input_desc:'첫째 줄에 양의 정수 N (1 ≤ N ≤ 1,000,000).',
    output_desc:'형식: <code>N -&gt; ... -&gt; root</code> (단일 자리면 N만)<br>예:<br><code>9875</code> → <code>9875 -&gt; 29 -&gt; 11 -&gt; 2</code><br><code>5</code> → <code>5</code>',
    ex_in:'9875', ex_out:'9875 -> 29 -> 11 -> 2', deadline:'2026-04-16T23:59',
    cases:[
      {id:1, input:'9875',  expected:'9875 -> 29 -> 11 -> 2',  pts:25},
      {id:2, input:'493',   expected:'493 -> 16 -> 7',         pts:25},
      {id:3, input:'5',     expected:'5',                      pts:25},
      {id:4, input:'99999', expected:'99999 -> 45 -> 9',       pts:25},
    ]
  },
  {
    id:'lc6', week:'Week 6B: Control flow - Loops (while, do-while, for)', title:'Decimal to Binary',
    desc:'양의 정수 N을 입력받아 <b>2진수 표현</b>을 출력하시오. <b>while 루프</b>로 N을 2로 나누면서 나머지를 모으는 진법 변환 알고리즘으로 작성할 것 (printf(\"%b\") 등 비표준 기능 금지).',
    input_desc:'첫째 줄에 양의 정수 N (1 ≤ N ≤ 1,000,000).',
    output_desc:'형식: <code>Binary: &lt;2진수&gt;</code><br>예: 10 → <code>Binary: 1010</code>',
    ex_in:'10', ex_out:'Binary: 1010', deadline:'2026-04-16T23:59',
    cases:[
      {id:1, input:'10',  expected:'Binary: 1010',     pts:25},
      {id:2, input:'1',   expected:'Binary: 1',        pts:25},
      {id:3, input:'255', expected:'Binary: 11111111', pts:25},
      {id:4, input:'16',  expected:'Binary: 10000',    pts:25},
    ]
  },

];

/* ── Week 01-04 practice problems (noSubmit) ── */
PROBLEMS.push(
  {
    id:'r01', week:'1~5주차 연습문제 (과제 아님, 테스트 가능)', noSubmit:true,
    title:'두 정수의 합',
    desc:'정수 210과 324의 합을 출력하는 프로그램을 작성하시오.',
    input_desc:'없음 (입력 불필요)',
    output_desc:'두 정수의 합을 출력한다.',
    ex_in:'',
    ex_out:'534',
    deadline:'2099-12-31',
    cases:[
      {id:1, input:'', expected:'534', pts:100},
    ]
  },
  {
    id:'r02', week:'1~5주차 연습문제 (과제 아님, 테스트 가능)', noSubmit:true,
    title:'연산자 우선순위',
    desc:'67 - 75 * 3 의 결과를 출력하는 프로그램을 작성하시오.<br>* 와 - 중 어느 연산이 먼저 수행될까요?',
    input_desc:'없음 (입력 불필요)',
    output_desc:'계산 결과를 출력한다.',
    ex_in:'',
    ex_out:'-158',
    deadline:'2099-12-31',
    cases:[
      {id:1, input:'', expected:'-158', pts:100},
    ]
  },
  {
    id:'r03', week:'1~5주차 연습문제 (과제 아님, 테스트 가능)', noSubmit:true,
    title:'합계와 평균',
    desc:'사용자로부터 3개의 정수를 입력받은 뒤, 합계와 평균을 계산하여 출력하는 프로그램을 작성하라.',
    input_desc:'정수 3개를 공백으로 구분하여 입력한다.',
    output_desc:'합계를 첫 줄에, 평균을 둘째 줄에 출력한다. 평균은 정수 나눗셈 결과를 그대로 출력한다. (소수점 없음)',
    ex_in:'10 20 30',
    ex_out:'60\n20',
    deadline:'2099-12-31',
    cases:[
      {id:1, input:'10 20 30', expected:'60\n20', pts:34},
      {id:2, input:'1 2 3',    expected:'6\n2',   pts:33},
      {id:3, input:'5 15 10',  expected:'30\n10', pts:33},
    ]
  },
  {
    id:'r04', week:'1~5주차 연습문제 (과제 아님, 테스트 가능)', noSubmit:true,
    title:'화씨→섭씨 변환',
    desc:'사용자로부터 화씨온도를 입력받아서, 섭씨온도로 변환하여 출력하라.<br>힌트: C = (5.0 / 9.0) * (F - 32)',
    input_desc:'화씨 온도(실수)를 입력한다.',
    output_desc:'섭씨 온도를 소수점 둘째 자리까지 출력한다.',
    ex_in:'32.0',
    ex_out:'0.00',
    deadline:'2099-12-31',
    cases:[
      {id:1, input:'32.0',  expected:'0.00',   pts:34},
      {id:2, input:'212.0', expected:'100.00', pts:33},
      {id:3, input:'98.6',  expected:'37.00',  pts:33},
    ]
  },
  {
    id:'r05', week:'1~5주차 연습문제 (과제 아님, 테스트 가능)', noSubmit:true,
    title:'뺄셈',
    desc:'두 개의 숫자를 입력받아 첫 번째 숫자에서 두 번째 숫자를 뺀 값을 출력하라.',
    input_desc:'정수 두 개를 공백으로 구분하여 입력한다.',
    output_desc:'첫 번째 수에서 두 번째 수를 뺀 결과를 출력한다.',
    ex_in:'10 3',
    ex_out:'7',
    deadline:'2099-12-31',
    cases:[
      {id:1, input:'10 3',  expected:'7',   pts:34},
      {id:2, input:'5 8',   expected:'-3',  pts:33},
      {id:3, input:'100 1', expected:'99',  pts:33},
    ]
  },
  {
    id:'r06', week:'1~5주차 연습문제 (과제 아님, 테스트 가능)', noSubmit:true,
    title:'실수 표기 변환',
    desc:'하나의 실수를 입력받아 소수점 표기방법과 지수 표기방법으로 동시에 출력하는 프로그램을 작성하라.',
    input_desc:'실수 하나를 입력한다.',
    output_desc:'소수점 표기(%f)를 첫 줄에, 지수 표기(%e)를 둘째 줄에 출력한다.',
    ex_in:'3.14',
    ex_out:'3.140000\n3.140000e+00',
    deadline:'2099-12-31',
    cases:[
      {id:1, input:'3.14',   expected:'3.140000\n3.140000e+00',   pts:50},
      {id:2, input:'1234.5', expected:'1234.500000\n1.234500e+03', pts:50},
    ]
  },
  {
    id:'r07', week:'1~5주차 연습문제 (과제 아님, 테스트 가능)', noSubmit:true,
    title:'변수 값 교환 (swap)',
    desc:'int형의 변수 x와 y의 값을 서로 교환하는 프로그램.<br>변수 x와 y는 10, 20의 값으로 초기화하라.<br>힌트: 임시 변수 temp를 활용하세요.',
    input_desc:'없음 (입력 불필요)',
    output_desc:'교환 후 x 값을 첫 줄에, y 값을 둘째 줄에 출력한다.',
    ex_in:'',
    ex_out:'20\n10',
    deadline:'2099-12-31',
    cases:[
      {id:1, input:'', expected:'20\n10', pts:100},
    ]
  },
  {
    id:'r08', week:'1~5주차 연습문제 (과제 아님, 테스트 가능)', noSubmit:true,
    title:'소수점 둘째 자리까지 출력',
    desc:'실수(float) 하나를 입력받아 저장한 후, 소수점 3째 자리에서 반올림해 2째 자리까지 출력하시오.',
    input_desc:'실수 하나를 입력한다.',
    output_desc:'소수점 둘째 자리까지 출력한다.',
    ex_in:'3.141',
    ex_out:'3.14',
    deadline:'2099-12-31',
    cases:[
      {id:1, input:'3.141',  expected:'3.14', pts:34},
      {id:2, input:'2.719',  expected:'2.72', pts:33},
      {id:3, input:'1.786',  expected:'1.79', pts:33},
    ]
  },
  /* ── OJ / P / CH additions (Week04 practice) ── */
  {
    id:'r09', week:'1~5주차 연습문제 (과제 아님, 테스트 가능)', noSubmit:true,
    title:'나머지 연산',
    desc:'456 % 89 의 결과를 출력하는 프로그램을 작성하시오.',
    input_desc:'없음 (입력 불필요)',
    output_desc:'나머지 연산 결과를 출력한다.',
    ex_in:'',
    ex_out:'11',
    deadline:'2099-12-31',
    cases:[{id:1, input:'', expected:'11', pts:100}]
  },
  {
    id:'r10', week:'1~5주차 연습문제 (과제 아님, 테스트 가능)', noSubmit:true,
    title:'괄호 연산',
    desc:'(67 - 75) * 3 의 결과를 출력하는 프로그램을 작성하시오.<br>괄호가 있으면 결과가 어떻게 달라질까요?',
    input_desc:'없음 (입력 불필요)',
    output_desc:'계산 결과를 출력한다.',
    ex_in:'',
    ex_out:'-24',
    deadline:'2099-12-31',
    cases:[{id:1, input:'', expected:'-24', pts:100}]
  },
  {
    id:'r11', week:'1~5주차 연습문제 (과제 아님, 테스트 가능)', noSubmit:true,
    title:'합과 곱',
    desc:'1부터 5까지 숫자들의 합, 곱을 한 줄에 출력하시오.<br>두 결과 사이에는 한 개의 공백만 존재한다.',
    input_desc:'없음 (입력 불필요)',
    output_desc:'합과 곱을 공백으로 구분하여 한 줄에 출력한다.',
    ex_in:'',
    ex_out:'15 120',
    deadline:'2099-12-31',
    cases:[{id:1, input:'', expected:'15 120', pts:100}]
  },
  {
    id:'r12', week:'1~5주차 연습문제 (과제 아님, 테스트 가능)', noSubmit:true,
    title:'나머지 출력',
    desc:'세 개의 숫자를 입력받아 각각을 2로 나눈 나머지를 순서대로 출력하라.',
    input_desc:'정수 3개를 공백으로 구분하여 입력한다.',
    output_desc:'각 수를 2로 나눈 나머지를 한 줄씩 출력한다.',
    ex_in:'1 2 3',
    ex_out:'1\n0\n1',
    deadline:'2099-12-31',
    cases:[
      {id:1, input:'1 2 3', expected:'1\n0\n1', pts:34},
      {id:2, input:'4 5 6', expected:'0\n1\n0', pts:33},
      {id:3, input:'7 8 9', expected:'1\n0\n1', pts:33},
    ]
  },
  {
    id:'r13', week:'1~5주차 연습문제 (과제 아님, 테스트 가능)', noSubmit:true,
    title:'마일→미터 변환',
    desc:'마일을 미터로 환산하는 프로그램.<br>마일 단위로 입력을 받고 1609를 곱해 미터로 변환하여 출력하라.<br>힌트: float 자료형과 scanf("%f", &변수) 사용',
    input_desc:'마일 값(실수)을 입력한다.',
    output_desc:'미터 값을 소수점 둘째 자리까지 출력한다.',
    ex_in:'1.0',
    ex_out:'1609.00',
    deadline:'2099-12-31',
    cases:[
      {id:1, input:'1.0',  expected:'1609.00',  pts:34},
      {id:2, input:'2.0',  expected:'3218.00',  pts:33},
      {id:3, input:'0.5',  expected:'804.50',   pts:33},
    ]
  },
  {
    id:'r14', week:'1~5주차 연습문제 (과제 아님, 테스트 가능)', noSubmit:true,
    title:'삼각형 넓이',
    desc:'삼각형의 높이와 밑변을 받아서 넓이를 계산하는 프로그램.<br>모든 데이터는 실수형 입력과 출력.<br>힌트: 넓이 = 0.5 × 밑변 × 높이',
    input_desc:'밑변과 높이(실수)를 공백으로 구분하여 입력한다.',
    output_desc:'넓이를 소수점 둘째 자리까지 출력한다.',
    ex_in:'3.0 4.0',
    ex_out:'6.00',
    deadline:'2099-12-31',
    cases:[
      {id:1, input:'3.0 4.0', expected:'6.00',  pts:34},
      {id:2, input:'5.0 8.0', expected:'20.00', pts:33},
      {id:3, input:'2.5 6.0', expected:'7.50',  pts:33},
    ]
  },
  {
    id:'r15', week:'1~5주차 연습문제 (과제 아님, 테스트 가능)', noSubmit:true,
    title:'다항식 계산',
    desc:'3x² + 7x + 11 을 계산하는 프로그램을 작성하라.<br>x는 사용자로부터 입력받는다.<br>힌트: x*x 또는 pow(x, 2) 사용 가능',
    input_desc:'정수 x를 입력한다.',
    output_desc:'3x² + 7x + 11 의 계산 결과를 출력한다.',
    ex_in:'2',
    ex_out:'37',
    deadline:'2099-12-31',
    cases:[
      {id:1, input:'2',  expected:'37',  pts:34},
      {id:2, input:'0',  expected:'11',  pts:33},
      {id:3, input:'3',  expected:'59',  pts:33},
    ]
  },
  {
    id:'r16', week:'1~5주차 연습문제 (과제 아님, 테스트 가능)', noSubmit:true,
    title:'진수 변환 출력',
    desc:'정수를 16진수로 입력받아서 8진수, 10진수, 16진수 형태로 출력하는 프로그램을 작성하라.<br>힌트: 입력: scanf("%x", &a) / 출력: %o, %d, %x',
    input_desc:'16진수 값을 입력한다. (예: ff)',
    output_desc:'8진수, 10진수, 16진수 순서로 한 줄씩 출력한다.',
    ex_in:'ff',
    ex_out:'377\n255\nff',
    deadline:'2099-12-31',
    cases:[
      {id:1, input:'ff', expected:'377\n255\nff',  pts:50},
      {id:2, input:'1f', expected:'37\n31\n1f',    pts:50},
    ]
  },
  {
    id:'r17', week:'1~5주차 연습문제 (과제 아님, 테스트 가능)', noSubmit:true,
    title:'상자의 부피',
    desc:'double형의 실수로 길이, 너비, 높이를 입력받아 부피를 출력하는 프로그램을 작성하라.<br>힌트: double은 scanf("%lf", &변수)로 입력',
    input_desc:'길이, 너비, 높이(실수)를 공백으로 구분하여 입력한다.',
    output_desc:'부피를 소수점 둘째 자리까지 출력한다.',
    ex_in:'2.0 3.0 4.0',
    ex_out:'24.00',
    deadline:'2099-12-31',
    cases:[
      {id:1, input:'2.0 3.0 4.0', expected:'24.00', pts:50},
      {id:2, input:'1.5 2.5 3.0', expected:'11.25', pts:50},
    ]
  },
  /* ── Practice problems (Week04 Bitwise IO) ── */
  {
    id:'r18', week:'1~5주차 연습문제 (과제 아님, 테스트 가능)', noSubmit:true,
    title:'시간 변환기',
    desc:'총 초(seconds)를 입력받아 <code>N seconds = HH:MM:SS</code> 형식으로 출력하라.<br>시 = total/3600, 분 = (total%3600)/60, 초 = total%60<br>예: 3725 → <code>3725 seconds = 01:02:05</code>',
    input_desc:'총 초(정수)를 입력한다.',
    output_desc:'<code>N seconds = %02d:%02d:%02d</code> 형식으로 출력한다.',
    ex_in:'3725',
    ex_out:'3725 seconds = 01:02:05',
    deadline:'2099-12-31',
    cases:[
      {id:1, input:'3725', expected:'3725 seconds = 01:02:05', pts:34},
      {id:2, input:'7200', expected:'7200 seconds = 02:00:00', pts:33},
      {id:3, input:'59',   expected:'59 seconds = 00:00:59',   pts:33},
    ]
  },
  {
    id:'r19', week:'1~5주차 연습문제 (과제 아님, 테스트 가능)', noSubmit:true,
    title:'학생 성적표',
    desc:'학생 이름과 3개 과목 점수를 입력받아 형식에 맞게 출력하라.<br>힌트: Name 행은 <code>printf("Name: %15s\\n", name)</code> (우측정렬), 과목/합계/평균 행은 <code>%-15s %8d</code> / <code>%-15s %8.2f</code>, 평균 계산 시 <code>(double)</code> 형변환 사용',
    starter:'#define _CRT_SECURE_NO_WARNINGS\n#include <stdio.h>\n\nint main(void)\n{\n    char name[50];  // 문자열(이름) 저장용 배열\n    int s1, s2, s3;\n\n    scanf("%s %d %d %d", name, &s1, &s2, &s3);  // 문자열은 & 없이\n\n    // 여기에 출력 코드를 작성하세요\n\n    return 0;\n}\n',
    input_desc:'이름(공백 없는 문자열)과 점수 3개를 입력한다.',
    output_desc:'아래 형식에 맞게 출력한다.',
    ex_in:'Alice 85 92 78',
    ex_out:'===== Student Score Report =====\nName:           Alice\n--------------------------------\nSubject 1:            85\nSubject 2:            92\nSubject 3:            78\n--------------------------------\nTotal:               255\nAverage:           85.00\n================================',
    deadline:'2099-12-31',
    cases:[
      {id:1, input:'Alice 85 92 78',
       expected:'===== Student Score Report =====\nName:           Alice\n--------------------------------\nSubject 1:            85\nSubject 2:            92\nSubject 3:            78\n--------------------------------\nTotal:               255\nAverage:           85.00\n================================',
       pts:100},
    ]
  },
  {
    id:'r20', week:'1~5주차 연습문제 (과제 아님, 테스트 가능)', noSubmit:true,
    title:'진수 변환기 (Binary 포함)',
    desc:'0~255 범위의 정수를 입력받아 10진수, 16진수, 8진수, 2진수로 출력하라.<br>힌트: C 표준 printf에 <code>%b</code>가 없으므로 비트 7부터 0까지 반복문으로 <code>(val &gt;&gt; i) &amp; 1</code> 을 출력하고, <code>i == 4</code> 일 때 공백을 삽입한다.',
    input_desc:'정수(0~255)를 입력한다.',
    output_desc:'<code>Decimal</code>, <code>Hex</code>, <code>Octal</code>, <code>Binary</code> 순서로 출력한다. (Binary는 4비트마다 공백)',
    ex_in:'255',
    ex_out:'Decimal:  255\nHex:      0xFF\nOctal:    0377\nBinary:   1111 1111',
    deadline:'2099-12-31',
    cases:[
      {id:1, input:'255', expected:'Decimal:  255\nHex:      0xFF\nOctal:    0377\nBinary:   1111 1111', pts:34},
      {id:2, input:'170', expected:'Decimal:  170\nHex:      0xAA\nOctal:    0252\nBinary:   1010 1010', pts:33},
      {id:3, input:'60',  expected:'Decimal:  60\nHex:      0x3C\nOctal:    074\nBinary:   0011 1100',  pts:33},
    ]
  },
  {
    id:'r21', week:'1~5주차 연습문제 (과제 아님, 테스트 가능)', noSubmit:true,
    title:'영수증 계산기',
    desc:'3개 상품의 가격(double)과 수량(int)을 입력받아 영수증을 출력하라.<br>소계, 세금(10%), 총계를 포함. 아이템 이름은 <code>Item 1</code>, <code>Item 2</code>, <code>Item 3</code>으로 하드코딩한다.<br><b>데이터 행 포맷:</b> <code>%-14s%3d%8.2f%8.2f</code> &nbsp;(이름 14, 수량 3, 단가 8, 금액 8)<br><b>합계 행 포맷:</b> <code>%-25s%8.2f</code> &nbsp;(레이블 25, 금액 8)<br><b>구분선:</b> <code>-</code> 32개 / <code>=</code> 32개',
    input_desc:'아이템 3개를 각 줄에 <code>가격 수량</code> 형식으로 입력한다.',
    output_desc:'형식에 맞는 영수증을 출력한다. 전체 너비 33자.',
    starter:'#define _CRT_SECURE_NO_WARNINGS\n#include <stdio.h>\n\nint main(void)\n{\n    double p1, p2, p3;\n    int q1, q2, q3;\n    scanf("%lf %d", &p1, &q1);\n    scanf("%lf %d", &p2, &q2);\n    scanf("%lf %d", &p3, &q3);\n\n    double a1=p1*q1, a2=p2*q2, a3=p3*q3;\n    double sub = a1+a2+a3;\n    double tax = sub * 0.1;\n    double total = sub + tax;\n\n    printf("============ RECEIPT ============\\n");\n    printf("%-14s%3s%8s%8s\\n", "Item", "Qty", "Price", "Amount");\n    printf("--------------------------------\\n");\n    // 데이터 행: %-14s%3d%8.2f%8.2f\n    printf("%-14s%3d%8.2f%8.2f\\n", "Item 1", q1, p1, a1);\n    // Item 2, Item 3 도 같은 형식으로 출력하세요\n\n    printf("--------------------------------\\n");\n    // 합계 행: %-25s%8.2f\n    printf("%-25s%8.2f\\n", "Subtotal:", sub);\n    printf("================================\\n");\n    return 0;\n}\n',
    ex_in:'4.5 2\n12 1\n3.75 3',
    ex_out:'============ RECEIPT ============\nItem          Qty   Price  Amount\n--------------------------------\nItem 1          2    4.50    9.00\nItem 2          1   12.00   12.00\nItem 3          3    3.75   11.25\n--------------------------------\nSubtotal:                   32.25\nTax (10%):                   3.23\nTOTAL:                      35.48\n================================',
    deadline:'2099-12-31',
    cases:[
      {id:1, input:'4.5 2\n12 1\n3.75 3',
       expected:'============ RECEIPT ============\nItem          Qty   Price  Amount\n--------------------------------\nItem 1          2    4.50    9.00\nItem 2          1   12.00   12.00\nItem 3          3    3.75   11.25\n--------------------------------\nSubtotal:                   32.25\nTax (10%):                   3.23\nTOTAL:                      35.48\n================================',
       pts:100},
    ]
  },
  {
    id:'r22', week:'1~5주차 연습문제 (과제 아님, 테스트 가능)', noSubmit:true,
    title:'Hex 색상 디코더',
    starter:'#define _CRT_SECURE_NO_WARNINGS\n#include <stdio.h>\n\nvoid print_binary_8(unsigned char val)\n{\n    int i;\n    for (i = 7; i >= 0; i--)\n        printf("%d", (val >> i) & 1);\n}\n\nint main(void)\n{\n    \n    return 0;\n}\n',
    desc:'24비트 hex 색상값(RRGGBB)을 입력받아 R, G, B 각 채널을 10진수, 16진수, 2진수로 출력하라.<br>추출: <code>R=(color&gt;&gt;16)&amp;0xFF</code>, <code>G=(color&gt;&gt;8)&amp;0xFF</code>, <code>B=color&amp;0xFF</code><br>힌트: 입력 <code>scanf("%x", &amp;color)</code> · 채널 출력 <code>printf("Red:   %3d  0x%02X  ", r, r)</code> 후 <code>print_binary_8(r)</code> 호출 · 재구성 <code>printf("Reconstructed: 0x%06X\\n", (r&lt;&lt;16)|(g&lt;&lt;8)|b)</code>',
    input_desc:'hex 색상값을 입력한다. (예: FF8C00) — <code>scanf("%x", &color)</code>로 읽는다.',
    output_desc:'Color Decoder 형식으로 출력한다. R/G/B 행: 10진(%3d) · 16진(0x%02X) · 2진(8비트) 사이는 공백 2칸.',
    ex_in:'FF8C00',
    ex_out:'===== Color Decoder =====\nInput: 0xFF8C00\n--------------------------\nRed:   255  0xFF  11111111\nGreen: 140  0x8C  10001100\nBlue:    0  0x00  00000000\n==========================\n\nReconstructed: 0xFF8C00',
    deadline:'2099-12-31',
    cases:[
      {id:1, input:'FF8C00',
       expected:'===== Color Decoder =====\nInput: 0xFF8C00\n--------------------------\nRed:   255  0xFF  11111111\nGreen: 140  0x8C  10001100\nBlue:    0  0x00  00000000\n==========================\n\nReconstructed: 0xFF8C00',
       pts:50},
      {id:2, input:'0000FF',
       expected:'===== Color Decoder =====\nInput: 0x0000FF\n--------------------------\nRed:     0  0x00  00000000\nGreen:   0  0x00  00000000\nBlue:  255  0xFF  11111111\n==========================\n\nReconstructed: 0x0000FF',
       pts:50},
    ]
  },
  {
    id:'r23', week:'1~5주차 연습문제 (과제 아님, 테스트 가능)', noSubmit:true,
    title:'임베디드 레지스터 시뮬레이터',
    desc:'8비트 하드웨어 레지스터를 시뮬레이션하라.<br>비트 상수는 각각 별도 <code>#define</code>으로 정의한다 (<code>#define</code>은 콤마로 이어 쓸 수 없음):<br><code>#define BIT_POWER  0</code><br><code>#define BIT_READY  1</code><br><code>#define BIT_SENSOR 2</code><br><code>#define BIT_MOTOR  3</code><br><code>#define BIT_ERROR  7</code><br>SET: <code>reg |= (1 &lt;&lt; BIT_X)</code> · CLEAR: <code>reg &amp;= ~(1 &lt;&lt; BIT_X)</code> · TOGGLE: <code>reg ^= (1 &lt;&lt; BIT_X)</code> · CHECK: <code>reg &amp; (1 &lt;&lt; BIT_X)</code><br>각 단계에서 <code>printf("%-18s 0x%02X  ", label, reg)</code> 후 비트 7→0 반복문으로 2진수 출력.<br>💡 지금은 레이블을 각 <code>printf</code>에 직접 써야 하지만, 8주차 배열을 배우고 나면 훨씬 간결하게 만들 수 있습니다. 나중에 다시 도전해보세요!',
    input_desc:'없음 (입력 불필요)',
    output_desc:'각 연산 후 레지스터 상태를 출력한다. 레이블은 %-18s (18칸 좌정렬) 후 <code> 0x%02X  </code> + 8비트 2진수.',
    ex_in:'',
    ex_out:'=== Embedded Register Simulator ===\nInitial:           0x00  00000000\nSET POWER:         0x01  00000001\nSET READY:         0x03  00000011\nSET SENSOR:        0x07  00000111\nSET MOTOR:         0x0F  00001111\n\nMotor is ON\n\nCLEAR SENSOR:      0x0B  00001011\nTOGGLE MOTOR:      0x03  00000011\nTOGGLE MOTOR:      0x0B  00001011\nSET ERROR:         0x8B  10001011\nEMERGENCY STOP:    0x80  10000000\n\nMotor is OFF\nError is SET',
    deadline:'2099-12-31',
    cases:[
      {id:1, input:'',
       expected:'=== Embedded Register Simulator ===\nInitial:           0x00  00000000\nSET POWER:         0x01  00000001\nSET READY:         0x03  00000011\nSET SENSOR:        0x07  00000111\nSET MOTOR:         0x0F  00001111\n\nMotor is ON\n\nCLEAR SENSOR:      0x0B  00001011\nTOGGLE MOTOR:      0x03  00000011\nTOGGLE MOTOR:      0x0B  00001011\nSET ERROR:         0x8B  10001011\nEMERGENCY STOP:    0x80  10000000\n\nMotor is OFF\nError is SET',
       pts:100},
    ]
  },
  {
    "id": "fp1",
    "week": "Week 7: Functions",
    "title": "Power Calculator",
    "createdAt": "2026-04-14T00:00",
    "desc": "함수 <code>long power(int base, int exp)</code>를 작성하여 base의 exp 거듭제곱을 반복문으로 계산하시오.<br>두 정수 base와 exp를 입력받아 함수를 호출한 결과를 출력하시오.",
    "input_desc": "첫째 줄에 두 정수 base, exp가 공백으로 구분되어 주어진다 (exp ≥ 0).",
    "output_desc": "형식: <code>Result: &lt;값&gt;</code><br>예: <code>2 10</code> → <code>Result: 1024</code>",
    "ex_in": "2 10",
    "ex_out": "Result: 1024",
    "deadline": "2026-04-22T23:59",
    "cases": [
      {"id": 1, "input": "2 10", "expected": "Result: 1024\n", "pts": 25},
      {"id": 2, "input": "3 0", "expected": "Result: 1\n", "pts": 25},
      {"id": 3, "input": "5 3", "expected": "Result: 125\n", "pts": 25},
      {"id": 4, "input": "7 4", "expected": "Result: 2401\n", "pts": 25}
    ]
  },
  {
    "id": "fp2",
    "week": "Week 7: Functions",
    "title": "Factorial",
    "createdAt": "2026-04-14T00:00",
    "desc": "함수 <code>long factorial(int n)</code>을 작성하여 n!(팩토리얼)을 반복문으로 계산하시오. 0! = 1임에 유의할 것.<br>정수 n을 입력받아 함수를 호출한 결과를 출력하시오.",
    "input_desc": "첫째 줄에 정수 n (0 ≤ n ≤ 20)이 주어진다.",
    "output_desc": "형식: <code>N! = &lt;값&gt;</code><br>예: n=5 → <code>N! = 120</code>",
    "ex_in": "5",
    "ex_out": "N! = 120",
    "deadline": "2026-04-22T23:59",
    "cases": [
      {"id": 1, "input": "0", "expected": "N! = 1\n", "pts": 25},
      {"id": 2, "input": "5", "expected": "N! = 120\n", "pts": 25},
      {"id": 3, "input": "10", "expected": "N! = 3628800\n", "pts": 25},
      {"id": 4, "input": "12", "expected": "N! = 479001600\n", "pts": 25}
    ]
  },
  {
    "id": "fp3",
    "week": "Week 7: Functions",
    "title": "Is Prime Function",
    "createdAt": "2026-04-14T00:00",
    "desc": "함수 <code>int is_prime(int n)</code>을 작성하시오. n이 소수이면 1, 아니면 0을 반환한다.<br>소수는 1보다 크고 1과 자기 자신만으로 나누어떨어지는 수이다. 정수 n을 입력받아 소수 여부를 출력하시오.",
    "input_desc": "첫째 줄에 정수 n이 주어진다.",
    "output_desc": "소수이면 <code>Prime: Yes</code>, 아니면 <code>Prime: No</code>를 출력.",
    "ex_in": "7",
    "ex_out": "Prime: Yes",
    "deadline": "2026-04-22T23:59",
    "cases": [
      {"id": 1, "input": "7", "expected": "Prime: Yes\n", "pts": 25},
      {"id": 2, "input": "1", "expected": "Prime: No\n", "pts": 25},
      {"id": 3, "input": "2", "expected": "Prime: Yes\n", "pts": 25},
      {"id": 4, "input": "100", "expected": "Prime: No\n", "pts": 25}
    ]
  },
  {
    "id": "fp4",
    "week": "Week 7: Functions",
    "title": "GCD and LCM",
    "createdAt": "2026-04-14T00:00",
    "desc": "함수 <code>int gcd(int a, int b)</code>를 유클리드 호제법으로 작성하시오: (a, b)를 (b, a%b)로 반복 치환하여 b가 0이 되면 a가 GCD이다.<br>이어서 <code>int lcm(int a, int b)</code>를 작성하되, 내부에서 <code>gcd()</code>를 호출하여 LCM = a / GCD(a,b) × b 로 계산하시오.<br>함수가 함수를 호출하는 패턴 — 로직을 중복 작성하지 않아도 된다.",
    "input_desc": "첫째 줄에 두 양의 정수 a, b가 공백으로 구분되어 주어진다.",
    "output_desc": "두 줄에 걸쳐 출력.<br>형식: <code>GCD: &lt;값&gt;</code> (줄바꿈) <code>LCM: &lt;값&gt;</code><br>예: <code>12 8</code> → <code>GCD: 4</code> / <code>LCM: 24</code>",
    "ex_in": "12 8",
    "ex_out": "GCD: 4\nLCM: 24",
    "deadline": "2026-04-22T23:59",
    "cases": [
      {"id": 1, "input": "12 8", "expected": "GCD: 4\nLCM: 24\n", "pts": 25},
      {"id": 2, "input": "10 15", "expected": "GCD: 5\nLCM: 30\n", "pts": 25},
      {"id": 3, "input": "7 3", "expected": "GCD: 1\nLCM: 21\n", "pts": 25},
      {"id": 4, "input": "18 24", "expected": "GCD: 6\nLCM: 72\n", "pts": 25}
    ]
  },
  {
    "id": "fc1",
    "week": "Week 7: Functions",
    "title": "nCr (Combination)",
    "createdAt": "2026-04-14T00:00",
    "desc": "조합 C(n,r) = n! / (r! × (n−r)!) 를 계산하시오.<br>함수 <code>long factorial(int n)</code>을 작성한 뒤, 이를 세 번 호출하여 nCr을 구하시오. 하나의 함수를 여러 번 재사용하는 패턴이다.<br>두 정수 n, r을 입력받아 조합 값을 출력하시오.",
    "input_desc": "첫째 줄에 두 정수 n, r이 공백으로 구분되어 주어진다 (0 ≤ r ≤ n ≤ 20).",
    "output_desc": "형식: <code>C(n,r) = &lt;값&gt;</code><br>예: <code>5 2</code> → <code>C(n,r) = 10</code>",
    "ex_in": "5 2",
    "ex_out": "C(n,r) = 10",
    "deadline": "2026-04-22T23:59",
    "cases": [
      {"id": 1, "input": "5 2", "expected": "C(n,r) = 10\n", "pts": 25},
      {"id": 2, "input": "10 3", "expected": "C(n,r) = 120\n", "pts": 25},
      {"id": 3, "input": "6 0", "expected": "C(n,r) = 1\n", "pts": 25},
      {"id": 4, "input": "10 10", "expected": "C(n,r) = 1\n", "pts": 25}
    ]
  },
  {
    "id": "fc2",
    "week": "Week 7: Functions",
    "title": "Perfect Number Checker",
    "createdAt": "2026-04-14T00:00",
    "desc": "완전수란 자기 자신을 제외한 약수의 합이 자기 자신과 같은 수이다 (예: 6 = 1+2+3).<br>헬퍼 함수 <code>int divisor_sum(int n)</code>을 작성하여 n의 진약수 합을 구한 뒤, <code>int is_perfect(int n)</code>에서 이를 호출하여 완전수 여부를 판별하시오.<br>정수 n을 입력받아 결과를 출력하시오.",
    "input_desc": "첫째 줄에 양의 정수 n이 주어진다.",
    "output_desc": "완전수이면 <code>Perfect: Yes</code>, 아니면 <code>Perfect: No</code>를 출력.",
    "ex_in": "6",
    "ex_out": "Perfect: Yes",
    "deadline": "2026-04-22T23:59",
    "cases": [
      {"id": 1, "input": "6", "expected": "Perfect: Yes\n", "pts": 25},
      {"id": 2, "input": "28", "expected": "Perfect: Yes\n", "pts": 25},
      {"id": 3, "input": "12", "expected": "Perfect: No\n", "pts": 25},
      {"id": 4, "input": "496", "expected": "Perfect: Yes\n", "pts": 25}
    ]
  },
  {
    "id": "fc3",
    "week": "Week 7: Functions",
    "title": "Sum of Primes",
    "createdAt": "2026-04-14T00:00",
    "desc": "함수 <code>int is_prime(int n)</code>을 작성하여 소수이면 1, 아니면 0을 반환하도록 하시오.<br>양의 정수 N을 입력받아 2 이상 N 이하의 모든 소수의 합을 구하시오. 루프 안에서 동일한 함수를 반복 호출하는 패턴이다.",
    "input_desc": "첫째 줄에 양의 정수 N이 주어진다.",
    "output_desc": "형식: <code>Sum: &lt;값&gt;</code><br>예: N=10 → 소수 2,3,5,7 → <code>Sum: 17</code>",
    "ex_in": "10",
    "ex_out": "Sum: 17",
    "deadline": "2026-04-22T23:59",
    "cases": [
      {"id": 1, "input": "10", "expected": "Sum: 17\n", "pts": 25},
      {"id": 2, "input": "100", "expected": "Sum: 1060\n", "pts": 25},
      {"id": 3, "input": "30", "expected": "Sum: 129\n", "pts": 25},
      {"id": 4, "input": "2", "expected": "Sum: 2\n", "pts": 25}
    ]
  },
);
