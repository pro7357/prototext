
import { LLM } from "llama-node"
import { LLamaCpp } from "llama-node/dist/llm/llama-cpp.js"
import path from "path"

const model = path.resolve(process.cwd(), "./models/ggml-vicuna-7b-1.1-q4_0.bin")
const llama = new LLM(LLamaCpp)

const config = {
	modelPath: model,
	enableLogging: true,
	nCtx: 1024,
	seed: 0,
	f16Kv: false,
	logitsAll: false,
	vocabOnly: false,
	useMlock: false,
	embedding: false,
	useMmap: true,
	nGpuLayers: 0
}

const userText = `Translate this into standard English: Спасибо за ссылку. Было интересно!`
const prompt = `A chat between a user and an assistant.
USER: ${userText}
ASSISTANT:`

const run = async () => {

	await llama.load(config)

	await llama.createCompletion({
		nThreads: 4,
		nTokPredict: 2048,
		topK: 40,
		topP: 0.1,
		temp: 0.2,
		repeatPenalty: 1,
		prompt,
	}, (response) => {
		process.stdout.write(response.token)
	})

}

run()