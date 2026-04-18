# 🎤 Speech: Onboarding Agéntico Wompi

> **Duración**: 3-4 minutos  
> **Audiencia**: Mixta (técnica y de negocio)  
> **Contexto**: Hackathon Wompi 2026 - Reto #03 Vinculación de Comercios

---

## 📌 APERTURA (30 segundos)

Imaginen esto: un comercio quiere vincularse a Wompi. Hoy tiene que navegar formularios, entender la diferencia entre Agregador y Gateway, subir documentos, esperar validaciones... y si algo falla, empezar de cero.

**¿Y si en lugar de eso, simplemente pudiera *conversar* con alguien que lo guíe paso a paso, que entienda su negocio, y que nunca olvide dónde quedó?**

Eso es exactamente lo que construimos: **Onboarding Agéntico**.

---

## 🔴 EL PROBLEMA (30 segundos)

El proceso de vinculación actual tiene fricción:

- Los comercios **no saben qué modelo les conviene** (Agregador vs Gateway)
- Los formularios son **genéricos** y no se adaptan al contexto
- Si se **interrumpe el proceso**, hay que repetir información

Para el **equipo de cumplimiento**, garantizar que *ningún* comercio se active sin pasar por SARLAFT es crítico.

Para el **equipo técnico**, tener visibilidad de qué pasó en cada vinculación es fundamental para auditoría y mejora continua.

---

## 💡 LA SOLUCIÓN (60 segundos)

Creamos un **agente conversacional inteligente** construido sobre **AWS Bedrock con Claude 3.5 Sonnet**. 

No es un chatbot con respuestas predefinidas — es un sistema que *piensa*, *decide* y *actúa*.

### Para el Comercio

La experiencia es simple: abre un chat, conversa naturalmente, y el agente lo guía.

- El agente hace **máximo 5 preguntas** para entender el negocio
- **Automáticamente determina** si le corresponde modelo Agregador o Gateway
- **Explica por qué** ese modelo es el adecuado para su caso

Si es Agregador:
- El agente **solicita el RUT**
- **Extrae automáticamente** el NIT y la razón social
- **Valida el dígito de verificación** contra el algoritmo oficial de la DIAN
- **Confirma los datos** con el comercio antes de continuar

### Para Cumplimiento

El agente **siempre** invoca la validación SARLAFT antes de aprobar. 

**No hay forma de saltarse este paso** — está codificado en la lógica del sistema.

Si SARLAFT rechaza, el comercio recibe una notificación clara y el proceso se detiene.

### Para el Equipo Técnico

Cada decisión del agente queda registrada:
- Qué herramienta usó
- Qué datos recibió
- Qué decidió y por qué

Todo consultable por comercio o por sesión.

---

## 🏗️ ARQUITECTURA (30 segundos)

*Para los técnicos:*

Usamos una **arquitectura multi-agente** con el patrón **Swarm**.

**5 agentes especializados:**

| Agente | Responsabilidad |
|--------|-----------------|
| **Triage** | Rutea al especialista correcto |
| **Clasificación** | Determina Agregador vs Gateway |
| **Documentos** | Extrae y valida RUT/NIT |
| **Cumplimiento** | Invoca SARLAFT |
| **Notificación** | Genera resumen y próximos pasos |

Cada uno tiene su propio "manual de operaciones" (SOP) y sus herramientas específicas.

**Persistencia**: DynamoDB con single-table design. Si el comercio cierra el chat y vuelve mañana, el agente sabe exactamente dónde quedó.

**Frontend**: Micro-frontend React embebible que se comunica vía HTTP REST con autenticación Cognito.

---

## ⭐ DIFERENCIADORES (30 segundos)

Tres cosas nos diferencian:

### 1. Autonomía Real
El agente **decide qué hacer según el contexto**, no sigue un script fijo. Si el comercio envía el RUT antes de que se lo pidan, el agente se adapta.

### 2. Cumplimiento Garantizado
SARLAFT **no es opcional**. Está en el código, no en un proceso manual.

### 3. Trazabilidad Completa
Cada decisión, cada herramienta, cada error — **todo queda registrado** en formato estructurado para auditoría.

---

## 🎯 CIERRE (30 segundos)

El **Onboarding Agéntico** transforma la vinculación de comercios de un proceso burocrático a una **conversación guiada**.

| Beneficio | Impacto |
|-----------|---------|
| **Reduce fricción** | Mejor experiencia para el comercio |
| **Garantiza cumplimiento** | SARLAFT siempre se ejecuta |
| **Da visibilidad total** | Auditoría y mejora continua |

Es el futuro de cómo Wompi puede **escalar la vinculación de comercios** sin sacrificar control ni experiencia de usuario.

**Gracias.**

---

## 📊 Datos Técnicos de Referencia

| Aspecto | Detalle |
|---------|---------|
| **Modelo LLM** | Claude 3.5 Sonnet (AWS Bedrock) |
| **Framework Agentes** | Strands Agents SDK (Swarm) |
| **Backend** | NestJS (Arquitectura Hexagonal) |
| **Frontend** | React (Micro-frontend embebible) |
| **Persistencia** | DynamoDB (Single Table Design) |
| **Autenticación** | AWS Cognito (JWT) |
| **Tiempo respuesta** | < 10 segundos |

### Tools del Agente

| Tool | Función |
|------|---------|
| `classify_model` | Determina Agregador vs Gateway |
| `extract_from_doc` | Extrae datos del RUT |
| `validate_nit` | Valida dígito verificación DIAN |
| `invoke_sarlaft` | Validación regulatoria obligatoria |
| `save_state` | Persiste estado en DynamoDB |

---

**Tiempo total estimado: 3 minutos 30 segundos** ⏱️
