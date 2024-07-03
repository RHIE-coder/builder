module.exports = {
  // 개행문자 설정
  endOfLine: 'lf',
  // 홑따옴표 사용
  singleQuote: true,
  // 세미콜론 사용 여부
  semi: true,
  // 탭의 사용을 금하고 스페이스바 사용으로 대체
  useTabs: false,
  tabWidth: 2,
  trailingComma: 'all',
  // 코드 한 줄의 최대 길이
  printWidth: 180,
  // 화살표 함수의 매개변수가 하나일 때 괄호 생략 여부 (always, avoid)
  arrowParens: 'always',
}

/*  

Prettier = Formatter = 스타일 교정
Eslint   = Linter    = 코드 퀄리티 오류

    eslint-config-prettier

  prettier를 사용하면서 충돌되는 eslint 규칙(rule) 비활성화

*/