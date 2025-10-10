React + Vite

Este modelo fornece uma configuração mínima para fazer o React funcionar no Vite com HMR (Hot Module Replacement) e algumas regras do ESLint.

Atualmente, dois plugins oficiais estão disponíveis:

@vitejs/plugin-react
 utiliza Babel
 (ou oxc
 quando usado no rolldown-vite
) para Fast Refresh

@vitejs/plugin-react-swc
 utiliza SWC
 para Fast Refresh

Compilador React

O Compilador React não está habilitado neste modelo devido ao impacto no desempenho de desenvolvimento e build.
Para adicioná-lo, veja a documentação aqui
.

Expandindo a configuração do ESLint

Se você estiver desenvolvendo uma aplicação de produção, recomendamos usar TypeScript com regras de lint conscientes de tipos habilitadas.
Confira o modelo TS
 para informações sobre como integrar TypeScript e typescript-eslint
 no seu projeto.
