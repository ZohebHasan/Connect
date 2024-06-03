from transformers import TFDistilBertForTokenClassification, DistilBertTokenizer

# Load the pre-trained DistilBERT model and tokenizer
model = TFDistilBertForTokenClassification.from_pretrained('distilbert-base-uncased')
tokenizer = DistilBertTokenizer.from_pretrained('distilbert-base-uncased')

# Save the model and tokenizer
model.save_pretrained('./distilbert_model')
tokenizer.save_pretrained('./distilbert_model')