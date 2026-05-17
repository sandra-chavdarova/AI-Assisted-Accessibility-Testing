import { runAnalysis } from './analysis';

async function runAllAnalyses() {

    await runAnalysis({
        model: 'gpt-4.1-mini',
        promptType: 'general',
    });

    await runAnalysis({
        model: 'gpt-4.1-mini',
        promptType: 'evidence-based',
    });

    await runAnalysis({
        model: 'gpt-5.5',
        promptType: 'general',
    });

    await runAnalysis({
        model: 'gpt-5.5',
        promptType: 'evidence-based',
    });

}

runAllAnalyses();