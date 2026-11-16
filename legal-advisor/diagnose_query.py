"""Diagnostic: run one question through the Legal Advisor pipeline several times
and show, stage by stage, where the runs start to differ.

Read-only: it uses the existing AdvisorPipeline and changes nothing.

Run from the legal-advisor folder:
    python diagnose_query.py "your question here" 3
"""
import sys
import textwrap

from dotenv import load_dotenv

load_dotenv()

from backend.rag.advisor_pipeline import AdvisorPipeline  # noqa: E402


def short(text, width=160):
    return textwrap.shorten(str(text or ""), width=width, placeholder=" …")


def ids(results):
    return [r.get("chunk_id") for r in results or []]


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    query = sys.argv[1]
    runs = int(sys.argv[2]) if len(sys.argv) > 2 else 3

    graph = AdvisorPipeline().advisor.graph.graph  # compiled LangGraph
    summaries = []

    for i in range(1, runs + 1):
        state = graph.invoke({"query": query.strip(), "retrieval_k": 10, "top_k": 5})
        situation = state.get("situation", {}) or {}
        gate = state.get("evidence_result", {}) or {}
        answer = state.get("answer", {}) or {}
        laws = [
            f"{law.get('law_name', '')} {law.get('provision', '')}".strip()
            for law in answer.get("applicable_law", []) or []
            if isinstance(law, dict)
        ]
        summaries.append((ids(state.get("retrieved")), ids(state.get("reranked")), gate.get("status"), answer.get("status")))

        print(f"\n================ RUN {i} ================")
        print("1. Situation analyzer status :", situation.get("status"))
        print("   Problem type             :", short(situation.get("problem_type")))
        print("   Retrieval query          :", short(state.get("retrieval_query"), 300))
        print("2. Retrieved chunk ids      :", ids(state.get("retrieved")))
        print("3. Reranked (top 5)         :", ids(state.get("reranked")))
        print("4. Evidence gate            :", gate.get("status"), "| proceed =", gate.get("proceed"), "|", short(gate.get("reason"), 200))
        print("5. Final answer status      :", answer.get("status"))
        print("   Laws cited               :", laws or "-")
        if answer.get("error"):
            print("   Error                    :", short(answer.get("error"), 200))
        if answer.get("important_note"):
            print("   Important note           :", short(answer.get("important_note"), 200))

    print("\n================ COMPARISON ================")
    first = summaries[0]
    labels = ["retrieved chunks", "reranked chunks", "evidence gate status", "final status"]
    for idx, label in enumerate(labels):
        same = all(s[idx] == first[idx] for s in summaries)
        print(f"{label:<22}: {'SAME in all runs' if same else 'DIFFERENT between runs'}")


if __name__ == "__main__":
    main()
