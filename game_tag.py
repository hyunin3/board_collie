import pandas as pd
from collections import Counter
import ast

# 엑셀 파일 로드
df = pd.read_csv('game_tag.csv')

# 태그 컬럼 이름을 설정 (예: 'Tags')
tags_column = 'tags'

# 태그 데이터를 파싱하고 집계
all_tags = []
for tags_str in df[tags_column]:
    try:
        # 문자열을 리스트로 변환
        tags_list = ast.literal_eval(tags_str)
        all_tags.extend(tags_list)
    except:
        print(f"Error parsing: {tags_str}")

# 태그 빈도수 계산
tag_counts = Counter(all_tags)

# 가장 많이 나타난 태그 순위대로 출력
for tag, count in tag_counts.most_common():
    print(f"{tag}: {count}")
