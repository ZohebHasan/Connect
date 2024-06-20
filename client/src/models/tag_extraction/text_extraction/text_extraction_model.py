import yake
import sys


# text = "i like basketball and my favorite player is LeBron James"

def extract_tags(text):
    language = "en"
    max_ngram_size = 3
    deduplication_threshold = 0.1
    num_of_keywords = 10
    # Extract Keywords
    kw_extractor = yake.KeywordExtractor(lan = language, n = max_ngram_size, dedupLim = deduplication_threshold, top = num_of_keywords)
    keywords = kw_extractor.extract_keywords(text)

    # Extracting keywords without the scores
    keywords_list = [kw[0] for kw in keywords]
    return keywords_list



if __name__ == '__main__':
    if len(sys.argv) > 1:
        text = sys.argv[1]
        print(extract_tags(text))
    else:
        print("No text provided")
