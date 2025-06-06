import { useState } from "react";
import {
  AppContainer,
  Input,
  TextArea, // Assuming TextArea is correctly styled as per previous requests
  HelpText,
  Highlight,
  ContentBox,
  FormGroup,
  Label,
  MainContentWrapper,
  SectionTitle,
  Button,
  ErrorMessage,
  ProseContent,
  ResultsTitle,
} from "./style";
import Loader from "../../components/Loader";

const convertMarkdownToHtml = (mdText) => {
  if (!mdText) return "";
  let html = "";

  // Adiciona uma etapa para converter links de Markdown para HTML
  let processedText = mdText.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
  );

  const grantBlocks = processedText.split(/\n(?=###\s)/);

  grantBlocks.forEach((grantBlock) => {
    if (!grantBlock.trim()) return;

    let itemHtml = "";
    const lines = grantBlock.split("\n");

    const titleLine = lines.find((line) => line.trim().startsWith("###"));
    if (titleLine) {
      itemHtml += titleLine
        .trim()
        .replace(
          /^###\s*(.*)/,
          '<h4 class="prose-custom grant-title">$1</h4>\n',
        );
    }

    itemHtml += '<ul class="prose-custom grant-details-list">\n';
    lines.forEach((line) => {
      const trimmedLine = line.trim();
      const detailMatch = trimmedLine.match(/^\*+\s*\*\*(.*?):\*\*\s*(.*)/);
      if (detailMatch) {
        const label = detailMatch[1].trim();
        const value = detailMatch[2].trim();
        itemHtml += `<li class="prose-custom grant-detail-item"><strong>${label}:</strong> ${value}</li>\n`;
      } else if (
        !trimmedLine.startsWith("###") &&
        trimmedLine.startsWith("*")
      ) {
        let content = trimmedLine.replace(/^[\s\*]+/, "").trim();
        if (content) {
          itemHtml += `<li class="prose-custom grant-detail-item">${content}</li>\n`;
        }
      }
    });
    itemHtml += "</ul>\n";
    html += `<div class="grant-item">${itemHtml.trim()}</div>`;
  });

  // Se nenhum grant-item foi processado, aplica regras gerais de Markdown (para Passo 2)
  if (!html.includes('class="grant-item"')) {
    let generalHtml = processedText; // Usar o processedText (com links já convertidos)
    generalHtml = generalHtml.replace(
      /^###\s*(.*$)/gim,
      '<h4 class="prose-custom">$1</h4>',
    );
    generalHtml = generalHtml.replace(
      /^##\s*(.*$)/gim,
      '<h2 class="prose-custom">$1</h2>',
    );
    generalHtml = generalHtml.replace(
      /^#\s*(.*$)/gim,
      '<h1 class="prose-custom">$1</h1>',
    );

    generalHtml = generalHtml.replace(
      /\*\*(.*?)\*\*/gim,
      "<strong>$1</strong>",
    );
    generalHtml = generalHtml.replace(/__(.*?)__/gim, "<strong>$1</strong>");
    generalHtml = generalHtml.replace(/\*(.*?)\*/gim, "<em>$1</em>");
    generalHtml = generalHtml.replace(/_(.*?)_/gim, "<em>$1</em>");

    let lines = generalHtml.split("\n");
    let resultHtml = "";
    let inList = false;
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      const listItemMatch = line.match(/^\s*[\-\*]\s+(.*)/);
      if (listItemMatch) {
        if (!inList) {
          resultHtml += '<ul class="prose-custom">\n'; // Adiciona classe para estilização global
          inList = true;
        }
        resultHtml += `  <li class="prose-custom">${listItemMatch[1].trim()}</li>\n`; // Adiciona classe
      } else {
        if (inList) {
          resultHtml += "</ul>\n";
          inList = false;
        }
        if (line.trim()) {
          // Evita re-envelopar HTML já existente ou linhas que são parte de um grant-item (pouco provável aqui)
          if (
            !line.trim().match(/^<(h[1-4]|ul|li|p|strong|em|div|a)/i) && // Adiciona 'a' para links
            !line.includes('class="grant-item"')
          ) {
            resultHtml += `<p class="prose-custom">${line.trim()}</p>\n`; // Adiciona classe
          } else {
            resultHtml += line + "\n";
          }
        } else if (
          i < lines.length - 1 &&
          lines[i + 1].trim() &&
          !lines[i - 1]?.trim().endsWith("</ul>")
        ) {
          if (
            resultHtml.trim().length > 0 &&
            !resultHtml.trim().endsWith("</ul>\n")
          )
            resultHtml += "<br>\n";
        }
      }
    }
    if (inList) {
      resultHtml += "</ul>\n";
    }
    html = resultHtml.trim();
  }

  html = html.replace(/(<br\s*\/?>\s*){2,}/g, "<br>");
  html = html.replace(/^<br\s*\/?>|<br\s*\/?>$/g, "");

  return html;
};

const CrawlAi = () => {
  const [grantFocus, setGrantFocus] = useState(
    "bolsas de desenvolvimento tecnológico para sustentabilidade ambiental",
  );
  const [generatedGrantExamplesText, setGeneratedGrantExamplesText] =
    useState(null);
  const [specificQuestion, setSpecificQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState(null);

  const [isLoadingStep1, setIsLoadingStep1] = useState(false);
  const [isLoadingStep2, setIsLoadingStep2] = useState(false);
  const [errorStep1, setErrorStep1] = useState(null);
  const [errorStep2, setErrorStep2] = useState(null);
  const [showStep2, setShowStep2] = useState(false);

  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  const genAIApiUrlBase = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const callGemini = async (promptText, temperature, maxTokens) => {
    const payload = {
      contents: [{ role: "user", parts: [{ text: promptText }] }],
      generationConfig: {
        temperature: temperature,
        maxOutputTokens: maxTokens,
      },
    };
    const response = await fetch(genAIApiUrlBase, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Erro da API Gemini:", errorData);
      let errorMessage = `Erro da API: ${response.status} ${response.statusText}.`;
      if (errorData.error && errorData.error.message) {
        errorMessage += ` Detalhes: ${errorData.error.message}`;
      }
      throw new Error(errorMessage);
    }

    const result = await response.json();

    if (
      result.candidates &&
      result.candidates.length > 0 &&
      result.candidates[0].content &&
      result.candidates[0].content.parts &&
      result.candidates[0].content.parts.length > 0
    ) {
      return result.candidates[0].content.parts[0].text;
    } else {
      if (result.promptFeedback && result.promptFeedback.blockReason) {
        throw new Error(
          `Geração de conteúdo bloqueada. Motivo: ${result.promptFeedback.blockReason}. Detalhes: ${JSON.stringify(result.promptFeedback.safetyRatings)}`,
        );
      }
      if (
        result.candidates &&
        result.candidates.length > 0 &&
        result.candidates[0].finishReason !== "STOP"
      ) {
        throw new Error(
          `Geração de conteúdo interrompida prematuramente. Motivo: ${result.candidates[0].finishReason}. Detalhes: ${JSON.stringify(result.candidates[0].safetyRatings)}`,
        );
      }
      console.error("Estrutura de resposta inesperada da Gemini:", result);
      throw new Error(
        "Não foi possível analisar o conteúdo da resposta da Gemini. A resposta pode estar vazia ou malformada.",
      );
    }
  };

  const handleGenerateGrantExamples = async () => {
    if (!grantFocus) {
      setErrorStep1("Por favor, insira o foco da sua bolsa.");
      return;
    }
    setIsLoadingStep1(true);
    setGeneratedGrantExamplesText(null);
    setErrorStep1(null);
    setShowStep2(false);
    setAiAnswer(null);
    setErrorStep2(null); // Clear previous Step 2 errors

    const prompt = `
              Você é um assistente de pesquisa de IA especializado em bolsas de desenvolvimento. O usuário está procurando informações sobre "${grantFocus}".
              Com base no seu conhecimento sobre oportunidades de bolsas típicas, gere uma lista de 3 - 5 oportunidades de bolsas, desde que a mesmas estejam abertas (MUITO IMPORTANTE), de *exemplo* que podem ser encontradas na web relacionadas a este foco.

              Para cada bolsa de exemplo, forneça:
              1.  Um Título de Bolsa plausível.
              2.  Um tipo típico de Fonte de Financiamento (ex: "Agência Governamental," "Fundação Privada," "ONG Internacional," "Programa de RSC Corporativo").
              3.  Um Valor/Intervalo estimado ou típico (ex: "$10.000 - $50.000," "Até $200.000," "Varia de acordo com o escopo do projeto").
              4.  Uma breve descrição (1-2 frases) do que a bolsa pode cobrir.
              5.  Um link para a origem da bolsa para que possa ser facilmente acessada.

              Apresente esta informação como uma lista. Use Markdown para formatação. 
              Para cada bolsa, use um Cabeçalho de Nível 3 (###) para o Título da Bolsa. Em seguida, use marcadores para Fonte, Valor e Descrição, com os rótulos em negrito (ex: * **Fonte de Financiamento:** ...).

              Estrutura de exemplo para uma bolsa:
              ### Título de Bolsa de Exemplo Um
              * **Fonte de Financiamento:** Fundação Privada XYZ
              * **Valor/Intervalo:** $25.000 - $75.000
              * **Descrição:** Esta bolsa apoia projetos piloto inovadores que usam tecnologia para enfrentar desafios ambientais locais.
              * **Link:** [Link para a Bolsa Exemplo Um](http://linkdabolsaexemplo1.com)

              Não inclua nenhum preâmbulo conversacional ou observações finais. Apenas forneça a lista de bolsas de exemplo.
            `;

    try {
      const generatedText = await callGemini(prompt, 0.7, 2048);
      setGeneratedGrantExamplesText(generatedText);
      setShowStep2(true);
      setSpecificQuestion("");
    } catch (error) {
      console.error("Erro ao gerar exemplos de bolsas:", error);
      setErrorStep1(`Falha ao gerar exemplos de bolsas: ${error.message}.`);
    } finally {
      setIsLoadingStep1(false);
    }
  };

  // Helper function to normalize and tokenize text
  const tokenizeText = (text) => {
    if (!text) return [];
    return text
      .toLowerCase()
      .replace(/[^\w\s'-]/gi, " ") // Allow apostrophes and hyphens within words for now, replace other punctuation with space
      .split(/\s+/) // Split by one or more spaces
      .filter(Boolean); // Remove empty strings
  };

  const handleGetAnswer = async () => {
    if (!specificQuestion) {
      setErrorStep2("Por favor, insira sua pergunta específica.");
      return;
    }
    if (!generatedGrantExamplesText) {
      setErrorStep2(
        "Por favor, gere as listagens de bolsas de exemplo primeiro (Passo 1).",
      );
      return;
    }

    // --- New logic to check for term overlap ---
    const grantExampleTerms = new Set(tokenizeText(generatedGrantExamplesText));
    const questionTerms = tokenizeText(specificQuestion);

    const hasOverlappingTerm = questionTerms.some((term) =>
      grantExampleTerms.has(term),
    );

    if (!hasOverlappingTerm) {
      setErrorStep2(
        "Sua pergunta deve incluir termos que estão presentes nas listagens de bolsas de exemplo acima para que a IA possa fornecer uma resposta relevante. Por favor, reformule sua pergunta ou gere novos exemplos se necessário.",
      );
      setAiAnswer(null); // Clear previous answer if any
      setIsLoadingStep2(false); // Ensure loading state is reset
      return;
    }
    // --- End of new logic ---

    setIsLoadingStep2(true);
    setAiAnswer(null);
    setErrorStep2(null);

    const prompt = `
              Você é um assistente de IA. Com base *apenas* nas "Listagens de Bolsas de Exemplo" fornecidas abaixo, responda à pergunta do usuário.
              Se a informação não estiver presente nas listagens fornecidas, declare claramente que a resposta não pode ser determinada a partir dos exemplos dados. Não use conhecimento externo nem invente informações.

              Listagens de Bolsas de Exemplo:
              ---
              ${generatedGrantExamplesText}
              ---

              Pergunta do Usuário: "${specificQuestion}"

              Formate sua resposta claramente usando Markdown.
            `;

    try {
      const generatedAnswerText = await callGemini(prompt, 0.2, 1024);
      setAiAnswer(convertMarkdownToHtml(generatedAnswerText));
    } catch (error) {
      console.error("Erro ao obter resposta:", error);
      setErrorStep2(`Falha ao obter resposta: ${error.message}.`);
    } finally {
      setIsLoadingStep2(false);
    }
  };

  return (
    <AppContainer>
      <MainContentWrapper>
        {/* Passo 1 */}
        <ContentBox>
          <SectionTitle>Passo 1: Defina o Foco da Sua Bolsa</SectionTitle>
          <FormGroup>
            <Label htmlFor="grantFocusInput">
              Descreva o tipo de bolsa que você está procurando:
            </Label>
            <Input
              type="text"
              id="grantFocusInput"
              value={grantFocus}
              onChange={(e) => setGrantFocus(e.target.value)}
            />
            <HelpText>
              Exemplos: "bolsas para projetos de arte na comunidade",
              "financiamento inicial para pesquisa em energia renovável"
            </HelpText>
          </FormGroup>
          <Button
            id="generateExamplesButton"
            onClick={handleGenerateGrantExamples}
            disabled={isLoadingStep1}
            primary
          >
            {isLoadingStep1
              ? "Gerando..."
              : "Gerar Listagens de Bolsas de Exemplo"}
          </Button>
        </ContentBox>

        {isLoadingStep1 && <Loader />}
        {errorStep1 && <ErrorMessage>{errorStep1}</ErrorMessage>}

        {generatedGrantExamplesText && !isLoadingStep1 && (
          <ContentBox id="grantListingsContainer">
            <ResultsTitle>
              Listagens de Bolsas de Exemplo para:{" "}
              <Highlight>{grantFocus}</Highlight>
            </ResultsTitle>
            <ProseContent
              className="prose-custom"
              dangerouslySetInnerHTML={{
                __html: convertMarkdownToHtml(generatedGrantExamplesText),
              }}
            />
          </ContentBox>
        )}

        {/* Passo 2 */}
        {showStep2 && !isLoadingStep1 && (
          <ContentBox id="step2Container">
            <SectionTitle>
              Passo 2: Faça Perguntas Sobre Estes Exemplos
            </SectionTitle>
            <FormGroup>
              <Label htmlFor="specificQuestionInput">
                Sua pergunta sobre as bolsas de exemplo mostradas acima:
              </Label>
              <TextArea
                id="specificQuestionInput"
                placeholder="Ex: Qual dessas bolsas parece adequada para uma pequena ONG?"
                value={specificQuestion}
                onChange={(e) => setSpecificQuestion(e.target.value)}
              />
            </FormGroup>
            <Button
              id="getAnswerButton"
              onClick={handleGetAnswer}
              disabled={isLoadingStep2}
              secondary // Usando a prop secondary para o botão verde
            >
              {isLoadingStep2 ? "Obtendo Resposta..." : "Obter Resposta da IA"}
            </Button>
          </ContentBox>
        )}

        {isLoadingStep2 && <Loader />}
        {errorStep2 && <ErrorMessage>{errorStep2}</ErrorMessage>}

        {aiAnswer && !isLoadingStep2 && (
          <ContentBox id="answerContainer">
            <ResultsTitle>Resposta da IA:</ResultsTitle>
            <ProseContent
              className="prose-custom"
              dangerouslySetInnerHTML={{ __html: aiAnswer }}
            />
          </ContentBox>
        )}
      </MainContentWrapper>
    </AppContainer>
  );
};

export default CrawlAi;
